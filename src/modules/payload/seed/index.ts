import fs from 'node:fs';
import path from 'node:path';

import type { BasePayload, PayloadRequest } from 'payload';
import type { 
	About,
	Author,
	GridBlock,
	Home, 
	Image, 
	ImageBlock, 
	LaGoccia, 
	Post, 
	Progetto, 
	QuoteBlock, 
	RichTextBlock, 
	TextBlock
} from '../payload-types';

// Import from our centralized data file
import { getDataForLocale } from './data';

type ContentBlock = TextBlock | RichTextBlock | QuoteBlock | ImageBlock | GridBlock;
type GridItem = ImageBlock | TextBlock | RichTextBlock;

// Cache for created images to avoid duplicates
const imageCache = new Map<string, string>();

// Processing depth limit to prevent stack overflow
const MAX_RECURSION_DEPTH = 20;

/**
 * CRITICAL LOCALIZATION PATTERN:
 * 
 * When dealing with PayloadCMS arrays that are NOT localized but contain fields that ARE localized:
 * 1. Arrays themselves are not localized - they share the same structure across all locales
 * 2. Individual fields within arrays can be localized
 * 3. When updating with a different locale, you MUST preserve ALL existing data
 * 4. Only update the specific localized fields within the existing array structure
 * 
 * WRONG APPROACH: Creating new arrays for each locale (overwrites previous locale data)
 * RIGHT APPROACH: Fetch existing structure, spread existing data, update only localized fields
 */

/**
 * Utility function to safely update a global with localized data
 * This ensures existing data is preserved when adding new locale data
 * 
 * NOTE: Due to TypeScript complexity with PayloadCMS globals, 
 * we keep the manual approach for each global for better type safety
 */

/**
 * Utility function to merge existing content blocks with new locale content blocks
 * This preserves non-localized fields while updating only localized fields
 */
const mergeContentBlocks = (existingBlocks: any[], newBlocks: any[]): any[] => {
	// Warn if block counts don't match
	if (existingBlocks.length !== newBlocks.length) {
		console.warn(`⚠️  Content block count mismatch: existing=${existingBlocks.length}, new=${newBlocks.length}`);
	}

	return existingBlocks.map((existingBlock: any, blockIndex: number) => {
		const newBlock = newBlocks[blockIndex];
		if (!newBlock) {
			// No corresponding new block, keep existing block as-is
			return existingBlock;
		}

		// Merge based on block type, preserving non-localized fields
		const mergedBlock = { ...existingBlock };

		// Update localized fields based on block type
		if (existingBlock.blockType === 'text' && newBlock.blockType === 'text') {
			mergedBlock.content = newBlock.content || existingBlock.content;
		} else if (existingBlock.blockType === 'richText' && newBlock.blockType === 'richText') {
			// For rich text, preserve structure but update content if available
			mergedBlock.content = newBlock.content || existingBlock.content;
		} else if (existingBlock.blockType === 'quote' && newBlock.blockType === 'quote') {
			mergedBlock.content = newBlock.content || existingBlock.content;
			mergedBlock.author = newBlock.author || existingBlock.author;
		} else if (existingBlock.blockType === 'grid' && newBlock.blockType === 'grid') {
			// For grid blocks, merge items array
			if (Array.isArray(existingBlock.items) && Array.isArray(newBlock.items)) {
				mergedBlock.items = existingBlock.items.map((existingItem: any, itemIndex: number) => {
					const newItem = newBlock.items?.[itemIndex];
					if (!newItem) return existingItem;

					const mergedItem = { ...existingItem };
					if (existingItem.blockType === 'text' && newItem.blockType === 'text') {
						mergedItem.content = newItem.content || existingItem.content;
					} else if (existingItem.blockType === 'richText' && newItem.blockType === 'richText') {
						mergedItem.content = newItem.content || existingItem.content;
					}
					return mergedItem;
				});
			}
		}

		return mergedBlock;
	});
};

const stripContentBlockIds = (block: ContentBlock): ContentBlock => {
	const cleanBlock = { ...block };
	
	if ('id' in cleanBlock) {
		delete cleanBlock.id;
	}
	
	if (block.blockType === 'grid') {
		const gridBlock = block as GridBlock;
		if (gridBlock.items) {
			const cleanItems = gridBlock.items.map(item => {
				const cleanItem = { ...item };
				if ('id' in cleanItem) {
					delete cleanItem.id;
				}
				return cleanItem as GridItem;
			});
			return {
				...cleanBlock,
				items: cleanItems,
			} as ContentBlock;
		}
	}
	
	return cleanBlock;
};

const processRichTextContent = async (
	payload: BasePayload,
	content: RichTextBlock['content'],
	depth: number = 0
): Promise<RichTextBlock['content']> => {
	if (!content?.root?.children || depth > MAX_RECURSION_DEPTH) {
		return content;
	}

	const processNode = async (
		node: { [k: string]: unknown; type: string; version: number },
		currentDepth: number
	): Promise<{ [k: string]: unknown; type: string; version: number }> => {
		if (currentDepth > MAX_RECURSION_DEPTH) {
			payload.logger.warn(`Recursion depth limit reached, skipping node processing`);
			return node;
		}

		if (node.type === 'upload' && node.relationTo === 'images' && node.value) {
			const imageData = node.value as Image;
			const imageId = await getOrCreateImage(
				payload,
				imageData.alt || imageData.caption || '',
				imageData.caption || undefined,
				imageData.filename || undefined
			);
			const resultNode = { ...node, value: imageId };
			if ('id' in resultNode) {
				delete resultNode.id;
			}
			return resultNode;
		}

		if (node.children && Array.isArray(node.children)) {
			const processedChildren = await Promise.all(
				(node.children as unknown[]).map((child: unknown) => 
					processNode(child as { [k: string]: unknown; type: string; version: number }, currentDepth + 1)
				)
			);
			return {
				...node,
				children: processedChildren,
			};
		}

		return node;
	};

	try {
		const processedChildren = await Promise.all(
			(content.root.children as unknown[]).map((child: unknown) =>
				processNode(child as { [k: string]: unknown; type: string; version: number }, depth + 1)
			)
		);

		return {
			...content,
			root: {
				...content.root,
				children: processedChildren,
			},
		};
	} catch (error) {
		payload.logger.error('Error processing rich text content:', error);
		return content;
	}
};

const getAssetPath = (filename: string): string | null => {
	const assetMappings: Record<string, string> = {
		// Home/Hero images
		'heroTitle.webp': 'images/homepage/heroTitle.webp',
		'heroTexture.webp': 'images/homepage/heroTexture.webp',
		'home_1.webp': 'images/homepage/home_1.webp',
		'home_2.webp': 'images/homepage/home_2.webp',
		'home_3.webp': 'images/homepage/home_3.webp',
		'home_5.webp': 'images/homepage/home_5.webp',
		'home_6.webp': 'images/homepage/home_6.webp',
		'home_7.webp': 'images/homepage/home_7.webp',
		'home_8.webp': 'images/homepage/home_8.webp',
		
		// La Goccia timeline events
		'event_1.webp': 'images/la-goccia/event_1.webp',
		'event_2.webp': 'images/la-goccia/event_2.webp',
		'event_3.webp': 'images/la-goccia/event_3.webp',
		'event_4.webp': 'images/la-goccia/event_4.webp',
		'event_5.webp': 'images/la-goccia/event_5.webp',
		'event_6.webp': 'images/la-goccia/event_6.webp',
		'event_7.webp': 'images/la-goccia/event_7.webp',
		
		// Project images
		'progetto_1.webp': 'images/progetto/progetto_1.webp',
		'progetto_2.webp': 'images/progetto/progetto_2.webp',
		'progetto_3.webp': 'images/progetto/progetto_3.webp',
		'progetto_4.webp': 'images/progetto/progetto_4.webp',
		
		// Blog images - Post 1
		'goccia_terrapreta.webp': 'images/posts/1/goccia_terrapreta.webp',
		'torre_terrapreta.webp': 'images/posts/1/torre_terrapreta.webp', 
		'gasometro_terrapreta.webp': 'images/posts/1/gasometro_terrapreta.webp',
		'vincenzi.webp': 'images/posts/1/vincenzi.webp',
		'goccia-damare.webp': 'images/posts/1/goccia-damare.webp',
		'cover_merati.webp': 'images/posts/1/cover_merati.webp',
		
		// Blog images - Post 2
		'cover.webp': 'images/posts/2/cover.webp',
		
		// Blog images - Post 3
		'galasso.webp': 'images/posts/3/galasso.webp',
		'specie.webp': 'images/posts/3/specie.webp',
		'margherite.webp': 'images/posts/3/margherite.webp',
		'cover-1.webp': 'images/posts/3/cover-1.webp',
		
		// Partner logos
		'milano.webp': 'images/logos/milano.png',
		'ambiente_italia.webp': 'images/logos/ambiente_italia.webp',
		'climate_flux.webp': 'images/logos/climate_flux.webp',
		'eutropian.webp': 'images/logos/eutropian.webp',
		'from.webp': 'images/logos/from.png',
		'open_impact.webp': 'images/logos/open_impact.webp',
		'osservatoriogoccia.webp': 'images/logos/osservatoriogoccia.png',
		'polimi.webp': 'images/logos/polimi.png',
	};

	return assetMappings[filename] || null;
};

const resolveAssetPath = (relativePath: string): string | null => {
	// Try different path resolutions for local vs Vercel environments
	const possiblePaths = [
		// Local development: files are in public/ directory
		path.join(process.cwd(), 'public', relativePath),
		// Vercel: try relative path from current working directory
		relativePath,
		// Alternative: try from public/ directly
		path.join('public', relativePath),
	];

	for (const fullPath of possiblePaths) {
		if (fs.existsSync(fullPath)) {
			return fullPath;
		}
	}

	return null;
};

const getOrCreateImage = async (
	payload: BasePayload,
	alt: string,
	caption?: string,
	filename?: string
): Promise<string> => {
	// Create cache key to avoid duplicate processing
	const cacheKey = `${alt}-${caption || ''}-${filename || ''}`;
	if (imageCache.has(cacheKey)) {
		return imageCache.get(cacheKey)!;
	}

	try {
		let fileData: Buffer;
		let originalFilename: string;
		let assetPath: string | null = null;

		if (filename) {
			assetPath = getAssetPath(filename);
			originalFilename = filename;
		} else {
			// Generate unique fallback filename to prevent collisions
			const timestamp = Date.now();
			const altHash = Buffer.from(alt).toString('base64').substring(0, 8);
			originalFilename = `fallback_${timestamp}_${altHash}.webp`;
		}

		if (!assetPath) {
			assetPath = `images/homepage/home_1.webp`;
			// Only change filename if we haven't already set a unique fallback
			if (filename) {
				const timestamp = Date.now();
				const altHash = Buffer.from(alt).toString('base64').substring(0, 8);
				originalFilename = `fallback_${timestamp}_${altHash}.webp`;
			}
		}

		const resolvedPath = resolveAssetPath(assetPath);
		if (resolvedPath) {
			fileData = fs.readFileSync(resolvedPath);
		} else {
			payload.logger.warn(`Asset not found for "${alt}", filename: "${filename}". Using fallback.`);
			const fallbackPath = 'images/homepage/home_1.webp';
			const resolvedFallbackPath = resolveAssetPath(fallbackPath);
			if (resolvedFallbackPath) {
				fileData = fs.readFileSync(resolvedFallbackPath);
				// Ensure unique filename even for missing assets
				if (!filename) {
					const timestamp = Date.now();
					const altHash = Buffer.from(alt).toString('base64').substring(0, 8);
					originalFilename = `fallback_${timestamp}_${altHash}.webp`;
				}
			} else {
				throw new Error(`No fallback asset available. Tried paths: ${fallbackPath}`);
			}
		}

		// Use filePath method for uploading local files as recommended by Payload docs
		const result = await payload.create({
			collection: 'images',
			data: {
				alt: alt,
				caption: caption,
			},
			file: {
				data: fileData,
				mimetype: path.extname(originalFilename).toLowerCase() === '.png' ? 'image/png' : 'image/webp',
				name: originalFilename,
				size: fileData.length,
			},
		});

		// Cache the result
		imageCache.set(cacheKey, result.id);
		payload.logger.info(`Created image for "${alt}" with filename "${originalFilename}"`);
		
		// Clear the file buffer from memory
		fileData = Buffer.alloc(0);
		
		return result.id;
	} catch (error) {
		payload.logger.error(`Error creating image "${alt}":`, error);
		throw error;
	}
};

const getOrCreateAuthor = async (
	payload: BasePayload,
	name: string,
	bioIt?: string,
	bioEn?: string
): Promise<string> => {
	try {
		const existingAuthors = await payload.find({
			collection: 'authors',
			where: {
				name: {
					equals: name,
				},
			},
		});

		if (existingAuthors.docs.length > 0) {
			return existingAuthors.docs[0].id;
		}

		// Create author with Italian data first (default locale)
		const result = await payload.create({
			collection: 'authors',
			data: {
				name: name,
				bio: bioIt || '',
				slug: name.toLowerCase().replace(/\s+/g, '-'),
			},
		});

		// If we have English bio data, add it to the English locale
		if (bioEn && bioEn !== bioIt) {
			try {
				await payload.update({
					collection: 'authors',
					id: result.id,
					data: {
						bio: bioEn,
						// Don't include non-localized fields like name, slug
					},
					locale: 'en',
				});
			} catch (updateError) {
				payload.logger.warn(`⚠️  Could not add English bio for author "${name}":`, updateError);
			}
		}

		return result.id;
	} catch (error) {
		payload.logger.error(`Error creating author "${name}":`, error);
		throw error;
	}
};

// Optimized content block processing function
const processContentBlocks = async (
	payload: BasePayload, 
	blocks: ContentBlock[]
): Promise<ContentBlock[]> => {
	return Promise.all(
		blocks.map(async (block: ContentBlock): Promise<ContentBlock> => {
			const cleanBlock = stripContentBlockIds(block);
			
			switch (cleanBlock.blockType) {
				case 'text': {
					const textBlock = cleanBlock as TextBlock;
					if (!textBlock.content) {
						throw new Error(`TextBlock missing required content field`);
					}
					return cleanBlock;
				}

				case 'image': {
					const imageBlock = cleanBlock as ImageBlock;
					const imageData = typeof imageBlock.image === 'string' 
						? { alt: 'Content Image', caption: '', filename: undefined }
						: imageBlock.image as Image;

					const imageId = await getOrCreateImage(
						payload, 
						imageData.alt, 
						imageData.caption || '',
						imageData.filename || undefined
					);
					return {
						...imageBlock,
						image: imageId,
					};
				}

				case 'richText': {
					const richTextBlock = cleanBlock as RichTextBlock;
					const processedContent = await processRichTextContent(
						payload,
						richTextBlock.content
					);
					return {
						...richTextBlock,
						content: processedContent || {
							root: {
								children: [],
								direction: 'ltr',
								format: '',
								indent: 0,
								type: 'root',
								version: 1,
							},
						},
					};
				}

				case 'quote': {
					const quoteBlock = cleanBlock as QuoteBlock;
					const processedContent = await processRichTextContent(
						payload,
						quoteBlock.content
					);
					return {
						...quoteBlock,
						content: processedContent || {
							root: {
								children: [],
								direction: 'ltr',
								format: '',
								indent: 0,
								type: 'root',
								version: 1,
							},
						},
					};
				}
				
				case 'grid': {
					const gridBlock = cleanBlock as GridBlock;
					if (gridBlock.items) {
						const processedItems = await Promise.all(
							gridBlock.items.map(async (item: GridItem): Promise<GridItem> => {
								if (item.blockType === 'image') {
									const imageItem = item as ImageBlock;
									const imageData = typeof imageItem.image === 'string' 
										? { alt: 'Grid Image', caption: '', filename: undefined }
										: imageItem.image as Image;

									const imageId = await getOrCreateImage(
										payload, 
										imageData.alt, 
										imageData.caption || '',
										imageData.filename || undefined
									);
									return {
										...imageItem,
										image: imageId,
									};
								}

								if (item.blockType === 'richText') {
									const richTextItem = item as RichTextBlock;
									const processedContent = await processRichTextContent(
										payload,
										richTextItem.content
									);
									return {
										...richTextItem,
										content: processedContent,
									};
								}

								if (item.blockType === 'text') {
									const textItem = item as TextBlock;
									if (!textItem.content) {
										throw new Error(`Grid TextBlock missing required content field`);
									}
									return textItem;
								}

								return item;
							})
						);
						return {
							...gridBlock,
							items: processedItems,
						};
					}
					break;
				}
			}
			
			return cleanBlock;
		})
	);
};

const createBlogPost = async (payload: BasePayload, postDataIt: Post, postDataEn: Post): Promise<void> => {
	try {
		payload.logger.info(`Creating blog post: ${postDataIt.title}`);

		// Get author data for both languages
		const authorDataIt = typeof postDataIt.author === 'string' 
			? { name: 'Unknown Author', bio: '' }
			: postDataIt.author as Author;

		const authorDataEn = typeof postDataEn.author === 'string' 
			? { name: 'Unknown Author', bio: '' }
			: postDataEn.author as Author;

		const authorId = await getOrCreateAuthor(
			payload, 
			authorDataIt.name, 
			authorDataIt.bio || '',
			authorDataEn.bio || ''
		);

		// Get cover image (same for both languages)
		const coverImageData = typeof postDataIt.coverImage === 'string' 
			? { alt: 'Cover Image', caption: '', filename: undefined }
			: postDataIt.coverImage as Image;

		const coverImageId = await getOrCreateImage(
			payload,
			coverImageData.alt,
			coverImageData.caption || '',
			coverImageData.filename || undefined
		);

		// Process content blocks for both locales
		const processedContentIt = await processContentBlocks(payload, postDataIt.content);
		const processedContentEn = await processContentBlocks(payload, postDataEn.content);

		// Create the post with Italian data as the default locale (no locale specified uses defaultLocale)
		const createdPost = await payload.create({
			collection: 'posts',
			data: {
				title: postDataIt.title,
				description: postDataIt.description,
				content: processedContentIt,
				meta: postDataIt.meta,
				coverImage: coverImageId,
				author: authorId,
				publishedAt: postDataIt.publishedAt,
				slug: postDataIt.slug,
				_status: postDataIt._status,
			},
			// Don't specify locale for initial creation - uses defaultLocale
		});

		// FIXED APPROACH: Fetch the current post data to get the content array structure,
		// then update only the localized fields within the existing content blocks
		try {
			const currentPost = await payload.findByID({
				collection: 'posts',
				id: createdPost.id,
				locale: 'it', // Get the Italian version to see the current structure
			});

			// Merge existing content structure with English localized fields using utility function
			const contentWithEnglishLocalized = currentPost.content && Array.isArray(currentPost.content) && Array.isArray(processedContentEn)
				? mergeContentBlocks(currentPost.content, processedContentEn)
				: currentPost.content;

			await payload.update({
				collection: 'posts',
				id: createdPost.id,
				data: {
					title: postDataEn.title || postDataIt.title,
					description: postDataEn.description || postDataIt.description,
					content: contentWithEnglishLocalized,
					// Don't include non-localized fields like coverImage, author, etc.
					// as they're already set and shared across locales
				},
				locale: 'en', // Specify English locale for this update
			});
			payload.logger.info(`✅ Added English locale data for post with proper content structure`);
		} catch (updateError) {
			payload.logger.warn(`⚠️  Could not add English locale, but post created successfully:`, updateError);
		}

		payload.logger.info(`✅ Created bilingual blog post: ${postDataIt.title}`);
	} catch (error) {
		payload.logger.error(`❌ Error creating blog post "${postDataIt.title}":`, error);
		throw error;
	}
};

const createGocciaData = async (payload: BasePayload, gocciaDataIt: LaGoccia, gocciaDataEn: LaGoccia): Promise<void> => {
	try {
		payload.logger.info('Creating Goccia timeline data...');

		// CRITICAL: Timeline array is NOT localized, but 'title' and 'description' fields within it ARE localized
		// Strategy: Create with Italian values first, then fetch and merge English values properly

		const timelineEn = gocciaDataEn.timeline || [];
		
		// Ensure both arrays have the same length by extending shorter one with fallback data
		const maxTimelineLength = Math.max(gocciaDataIt.timeline?.length || 0, timelineEn.length);

		// Process timeline array - create base structure with Italian localized field values
		const processedTimelineIt = await Promise.all(
			Array.from({ length: maxTimelineLength }, async (_, index) => {
				const itEvent = gocciaDataIt.timeline?.[index];
				const enEvent = timelineEn[index];
				
				// Use Italian event as base, fallback to first Italian event if needed
				const baseEvent = itEvent || gocciaDataIt.timeline?.[0];
				if (!baseEvent) {
					throw new Error('No timeline events found in Italian data');
				}

				const coverData = typeof baseEvent.cover === 'string' 
					? { alt: baseEvent.title || 'Timeline Event', caption: '', filename: undefined }
					: baseEvent.cover as Image;

				const coverId = await getOrCreateImage(
					payload, 
					coverData.alt,
					coverData.caption || '',
					coverData.filename || undefined
				);
				
				return {
					start: itEvent?.start || baseEvent.start, // Not localized
					end: itEvent?.end || baseEvent.end, // Not localized
					title: itEvent?.title || baseEvent.title, // Italian title (localized field)
					description: itEvent?.description || baseEvent.description, // Italian description (localized field)
					cover: coverId, // Not localized
				};
			})
		);

		// Create/update global with Italian content as default locale
		await payload.updateGlobal({
			slug: 'la-goccia',
			data: {
				description: gocciaDataIt.description, // Italian description (localized)
				timeline: processedTimelineIt, // Timeline with Italian localized field content
			},
			// Don't specify locale - uses defaultLocale (Italian)
		});

		// FIXED APPROACH: Fetch the current global data to get the array structure,
		// then update only the localized fields within the existing array items
		const currentGlobal = await payload.findGlobal({
			slug: 'la-goccia',
			locale: 'it', // Get the Italian version to see the current structure
		});

		// Update with English locale data - preserve the exact structure and only update localized fields
		const timelineWithEnglishLocalized = currentGlobal.timeline?.map((event: any, index: number) => {
			const enEvent = timelineEn[index];
			return {
				// Keep ALL existing fields from the current structure
				...event,
				// Update ONLY localized fields with English values
				title: enEvent?.title || event.title, // English title or fallback to current
				description: enEvent?.description || event.description, // English description or fallback to current
			};
		});

		await payload.updateGlobal({
			slug: 'la-goccia',
			data: {
				description: gocciaDataEn.description, // English description (localized)
				timeline: timelineWithEnglishLocalized, // Timeline with SAME structure but English localized field values
			},
			locale: 'en', // Specify English locale to update English values
		});

		payload.logger.info('✅ Created bilingual Goccia data');
	} catch (error) {
		payload.logger.error('❌ Error creating Goccia data:', error);
		throw error;
	}
};

const createProjectData = async (payload: BasePayload, projectDataIt: Progetto, projectDataEn: Progetto): Promise<void> => {
	try {
		payload.logger.info('Creating Project data...');

		// CRITICAL: Sections array is NOT localized, but 'title' field within it IS localized
		// Strategy: Create with Italian values first, then update with English values for localized fields only

		const sectionsEn = projectDataEn.sections || [];
		
		// Ensure both arrays have the same length by extending shorter one with fallback data
		const maxSectionsLength = Math.max(projectDataIt.sections?.length || 0, sectionsEn.length);

		// Process sections array - create base structure with Italian localized field values
		const processedSectionsIt = await Promise.all(
			Array.from({ length: maxSectionsLength }, async (_, index) => {
				const itSection = projectDataIt.sections?.[index];
				const enSection = sectionsEn[index];
				
				// Use Italian section as base, fallback to first Italian section if needed
				const baseSection = itSection || projectDataIt.sections?.[0];
				if (!baseSection) {
					throw new Error('No sections found in Italian data');
				}

				const processedContent = await processContentBlocks(payload, baseSection.content);

				return {
					title: itSection?.title || baseSection.title, // Italian title (localized field)
					content: processedContent, // Not localized (blocks)
					url: itSection?.url || baseSection.url, // Not localized
				};
			})
		);

		// Create/update global with Italian content as default locale
		await payload.updateGlobal({
			slug: 'progetto',
			data: {
				sections: processedSectionsIt, // Sections with Italian localized field content
			},
			// Don't specify locale - uses defaultLocale (Italian)
		});

		// FIXED APPROACH: Fetch the current global data to get the array structure,
		// then update only the localized fields within the existing array items
		const currentGlobal = await payload.findGlobal({
			slug: 'progetto',
			locale: 'it', // Get the Italian version to see the current structure
		});

		// Update sections with SAME structure but English localized field values
		const sectionsWithEnglishLocalized = (currentGlobal.sections || []).map((section: any, index: number) => {
			const enSection = sectionsEn[index];
			
			// CRITICAL: Content blocks themselves may contain localized fields
			// We need to merge the existing content structure with English content, not replace it
			let mergedContent = section.content; // Default to existing content
			
			if (enSection?.content && Array.isArray(section.content) && Array.isArray(enSection.content)) {
				// Use utility function to merge content blocks properly
				mergedContent = mergeContentBlocks(section.content, enSection.content);
			}

			return {
				// Keep ALL existing fields from the current structure
				...section,
				// Update ONLY localized fields with English values
				title: enSection?.title || section.title, // English title or fallback to current
				// Use merged content that preserves Italian data
				content: mergedContent,
			};
		});

		// Update with English locale data - include the array with English localized values
		await payload.updateGlobal({
			slug: 'progetto',
			data: {
				sections: sectionsWithEnglishLocalized, // Sections with SAME structure but English localized field values
			},
			locale: 'en', // Specify English locale to update English values
		});

		payload.logger.info('✅ Created bilingual Project data');
	} catch (error) {
		payload.logger.error('❌ Error creating Project data:', error);
		throw error;
	}
};

const createAboutData = async (payload: BasePayload, aboutDataIt: About, aboutDataEn: About): Promise<void> => {
	try {
		payload.logger.info('Creating About data...');

		// CRITICAL: Partners array is NOT localized, but 'name', 'bio', and 'members' fields within it ARE localized
		// Strategy: Create with Italian values first, then update with English values for localized fields only

		const partnersEn = aboutDataEn.partners || [];
		
		// Ensure both arrays have the same length by extending shorter one with fallback data
		const maxPartnersLength = Math.max(aboutDataIt.partners?.length || 0, partnersEn.length);

		// Process partners array - create base structure with Italian localized field values
		const processedPartnersIt = await Promise.all(
			Array.from({ length: maxPartnersLength }, async (_, index) => {
				const itPartner = aboutDataIt.partners?.[index];
				const enPartner = partnersEn[index];
				
				// Use Italian partner as base, fallback to first Italian partner if needed
				const basePartner = itPartner || aboutDataIt.partners?.[0];
				if (!basePartner) {
					throw new Error('No partners found in Italian data');
				}

				let logoId: string | undefined;
				
				if (basePartner.logo) {
					const logoData = typeof basePartner.logo === 'string' 
						? { alt: basePartner.name, caption: '', filename: undefined }
						: basePartner.logo as Image;

					logoId = await getOrCreateImage(
						payload, 
						logoData.alt,
						logoData.caption || '',
						logoData.filename || undefined
					);
				}

				return {
					name: itPartner?.name || basePartner.name, // Italian name (localized field)
					bio: itPartner?.bio || basePartner.bio, // Italian bio (localized field)
					logo: logoId, // Not localized
					members: itPartner?.members || basePartner.members, // Italian members (localized field)
					links: itPartner?.links || basePartner.links, // Not localized (group with no localized fields)
				};
			})
		);

		// Create/update global with Italian content as default locale
		await payload.updateGlobal({
			slug: 'about',
			data: {
				description: aboutDataIt.description, // Italian description (localized)
				partners: processedPartnersIt, // Partners with Italian localized field content
			},
			// Don't specify locale - uses defaultLocale (Italian)
		});

		// FIXED APPROACH: Fetch the current global data to get the array structure,
		// then update only the localized fields within the existing array items
		const currentGlobal = await payload.findGlobal({
			slug: 'about',
			locale: 'it', // Get the Italian version to see the current structure
		});

		// Update partners with SAME structure but English localized field values
		const partnersWithEnglishLocalized = (currentGlobal.partners || []).map((partner: any, index: number) => {
			const enPartner = partnersEn[index];
			return {
				// Keep ALL existing fields from the current structure
				...partner,
				// Update ONLY localized fields with English values
				name: enPartner?.name || partner.name, // English name or fallback to current
				bio: enPartner?.bio || partner.bio, // English bio or fallback to current
				members: enPartner?.members || partner.members, // English members or fallback to current
				// Links might contain both localized and non-localized data, so update if provided
				links: enPartner?.links || partner.links, // Use English links or fallback to current
			};
		});

		// Update with English locale data - include the array with English localized values
		await payload.updateGlobal({
			slug: 'about',
			data: {
				description: aboutDataEn.description, // English description (localized)
				partners: partnersWithEnglishLocalized, // Partners with SAME structure but English localized field values
			},
			locale: 'en', // Specify English locale to update English values
		});

		payload.logger.info('✅ Created bilingual About data');
	} catch (error) {
		payload.logger.error('❌ Error creating About data:', error);
		throw error;
	}
};

const createHomeData = async (payload: BasePayload, homeDataIt: Home, homeDataEn: Home): Promise<void> => {
	try {
		payload.logger.info('Creating Home data...');

		// Process hero images (shared across all languages)
		const heroTitleData = typeof homeDataIt.hero_title === 'string' 
			? { alt: 'GOCCIA Hero Title', caption: '', filename: undefined }
			: homeDataIt.hero_title as Image;

		const heroTextureData = typeof homeDataIt.hero_texture === 'string' 
			? { alt: 'GOCCIA Hero Texture', caption: '', filename: undefined }
			: homeDataIt.hero_texture as Image;

		const heroImageData = typeof homeDataIt.hero_image === 'string' 
			? { alt: 'GOCCIA Hero Image', caption: '', filename: undefined }
			: homeDataIt.hero_image as Image;

		const heroTitleId = await getOrCreateImage(
			payload,
			heroTitleData.alt,
			heroTitleData.caption || '',
			heroTitleData.filename || undefined
		);

		const heroTextureId = await getOrCreateImage(
			payload,
			heroTextureData.alt,
			heroTextureData.caption || '',
			heroTextureData.filename || undefined
		);

		const heroImageId = await getOrCreateImage(
			payload,
			heroImageData.alt,
			heroImageData.caption || '',
			heroImageData.filename || undefined
		);

		// Process rich text content for both locales
		const processedIntroText1It = await processRichTextContent(payload, homeDataIt.intro_text_1);
		const processedIntroText2It = await processRichTextContent(payload, homeDataIt.intro_text_2);
		const processedIntroText1En = await processRichTextContent(payload, homeDataEn.intro_text_1);
		const processedIntroText2En = await processRichTextContent(payload, homeDataEn.intro_text_2);

		// CRITICAL: Arrays are NOT localized, but fields within them ARE localized
		// Strategy: Create with Italian values first, then fetch and merge English values properly

		const forestEn = homeDataEn.forest || [];
		const whatEn = homeDataEn.what || [];

		// Ensure both arrays have the same length by extending shorter one with fallback data
		const maxForestLength = Math.max(homeDataIt.forest?.length || 0, forestEn.length);
		const maxWhatLength = Math.max(homeDataIt.what?.length || 0, whatEn.length);

		// Process forest array - create base structure with Italian localized field values
		const processedForest = await Promise.all(
			Array.from({ length: maxForestLength }, async (_, index) => {
				const itItem = homeDataIt.forest?.[index];
				const enItem = forestEn[index];
				
				// Use Italian item as base, fallback to first Italian item if needed
				const baseItem = itItem || homeDataIt.forest?.[0];
				if (!baseItem) {
					throw new Error('No forest items found in Italian data');
				}

				const imageData = typeof baseItem.image === 'string' 
					? { alt: 'GOCCIA Home Forest', caption: '', filename: undefined }
					: baseItem.image as Image;

				const imageId = await getOrCreateImage(
					payload,
					imageData.alt,
					imageData.caption || '',
					imageData.filename || undefined
				);

				return {
					data: itItem?.data || baseItem.data, // Italian data (localized field)
					caption: itItem?.caption || baseItem.caption, // Italian caption (localized field)
					image: imageId, // Shared image (not localized)
				};
			})
		);

		// Process what array - create base structure with Italian localized field values
		const processedWhat = await Promise.all(
			Array.from({ length: maxWhatLength }, async (_, index) => {
				const itItem = homeDataIt.what?.[index];
				const enItem = whatEn[index];
				
				// Use Italian item as base, fallback to first Italian item if needed
				const baseItem = itItem || homeDataIt.what?.[0];
				if (!baseItem) {
					throw new Error('No what items found in Italian data');
				}

				const imageData = typeof baseItem.image === 'string' 
					? { alt: 'GOCCIA Home What', caption: '', filename: undefined }
					: baseItem.image as Image;

				const imageId = await getOrCreateImage(
					payload,
					imageData.alt,
					imageData.caption || '',
					imageData.filename || undefined
				);

				return {
					data: itItem?.data || baseItem.data, // Italian data (localized field)
					caption: itItem?.caption || baseItem.caption, // Italian caption (localized field)
					image: imageId, // Shared image (not localized)
				};
			})
		);

		// Create/update global with Italian content as default locale
		await payload.updateGlobal({
			slug: 'home',
			data: {
				// Non-localized fields (shared for all languages)
				hero_title: heroTitleId,
				hero_texture: heroTextureId,
				hero_image: heroImageId,
				// Arrays with Italian localized field content
				forest: processedForest,
				what: processedWhat,
				// Localized rich text fields (Italian)
				intro_text_1: processedIntroText1It || homeDataIt.intro_text_1,
				intro_text_2: processedIntroText2It || homeDataIt.intro_text_2,
			},
			// Don't specify locale - uses defaultLocale (Italian)
		});

		// FIXED APPROACH: Fetch the current global data to get the array structure,
		// then update only the localized fields within the existing array items
		const currentGlobal = await payload.findGlobal({
			slug: 'home',
			locale: 'it', // Get the Italian version to see the current structure
		});

		// Update arrays with SAME structure but English localized field values
		const forestWithEnglishLocalized = currentGlobal.forest?.map((item: any, index: number) => {
			const enItem = forestEn[index];
			return {
				// Keep ALL existing fields from the current structure
				...item,
				// Update ONLY localized fields with English values
				data: enItem?.data || item.data, // English data or fallback to current
				caption: enItem?.caption || item.caption, // English caption or fallback to current
			};
		});

		const whatWithEnglishLocalized = currentGlobal.what?.map((item: any, index: number) => {
			const enItem = whatEn[index];
			return {
				// Keep ALL existing fields from the current structure
				...item,
				// Update ONLY localized fields with English values
				data: enItem?.data || item.data, // English data or fallback to current
				caption: enItem?.caption || item.caption, // English caption or fallback to current
			};
		});

		// Update with English locale data - include the arrays with English localized values
		await payload.updateGlobal({
			slug: 'home',
			data: {
				// Update only localized rich text fields for English
				intro_text_1: processedIntroText1En || homeDataEn.intro_text_1,
				intro_text_2: processedIntroText2En || homeDataEn.intro_text_2,
				// Update arrays with SAME structure but English localized field values
				forest: forestWithEnglishLocalized,
				what: whatWithEnglishLocalized,
			},
			locale: 'en', // Specify English locale to update English values
		});

		payload.logger.info('✅ Created bilingual Home data');
	} catch (error) {
		payload.logger.error('❌ Error creating Home data:', error);
		throw error;
	}
};

// Memory cleanup function
const clearMemoryCache = (): void => {
	imageCache.clear();
	if (global.gc) {
		global.gc();
	}
};

const cleanupDatabase = async (payload: BasePayload): Promise<void> => {
	try {
		payload.logger.info('🧹 Cleaning up existing data...');

		// Delete posts first
		payload.logger.info('🗑️  Deleting all posts...');
		await payload.delete({
			collection: 'posts',
			where: {
				id: { exists: true }
			}
		});
		payload.logger.info(`✅ Deleted all posts`);

		// Delete authors
		payload.logger.info('🗑️  Deleting all authors...');
		await payload.delete({
			collection: 'authors',
			where: {
				id: { exists: true }
			}
		});
		payload.logger.info(`✅ Deleted all authors`);

		// Delete images
		payload.logger.info('🗑️  Deleting all images...');
		await payload.delete({
			collection: 'images',
			where: {
				id: { exists: true }
			}
		});
		payload.logger.info(`✅ Deleted all images`);

		// Clear memory cache after cleanup
		clearMemoryCache();
		payload.logger.info('🎯 Database cleanup completed!');
	} catch (error) {
		payload.logger.error('❌ Error during cleanup:', error);
		throw error;
	}
};

export const seed = async ({
	payload,
	req: _req,
}: {
	payload: BasePayload;
	req: PayloadRequest;
}): Promise<void> => {
	const startTime = Date.now();
	
	try {
		payload.logger.info('🌱 Starting optimized database seeding...');

		// Clean up existing data first
		await cleanupDatabase(payload);

		payload.logger.info('🔄 Preparing to seed multilingual data...');

		// Get data for both locales
		const dataIt = getDataForLocale('it');
		const dataEn = getDataForLocale('en');

		payload.logger.info('📝 Creating multilingual blog posts...');
		// Process posts one by one to avoid memory overload
		for (let i = 0; i < dataIt.posts.length; i++) {
			const postStart = Date.now();
			const postIt = dataIt.posts[i];
			const postEn = dataEn.posts[i] || postIt;
			
			await createBlogPost(payload, postIt, postEn);
			
			// Clear memory cache after each post to prevent accumulation
			if (i % 2 === 0) { // Clear every 2 posts
				clearMemoryCache();
			}
			
			payload.logger.info(`⏱️  Post ${i + 1}/${dataIt.posts.length} completed in ${Date.now() - postStart}ms`);
		}

		payload.logger.info('🕐 Creating multilingual Goccia data...');
		await createGocciaData(payload, dataIt.goccia, dataEn.goccia);
		clearMemoryCache();

		payload.logger.info('🏗️ Creating multilingual Project data...');
		await createProjectData(payload, dataIt.project, dataEn.project);
		clearMemoryCache();

		payload.logger.info('ℹ️ Creating multilingual About data...');
		await createAboutData(payload, dataIt.about, dataEn.about);
		clearMemoryCache();

		payload.logger.info('🏠 Creating multilingual Home data...');
		await createHomeData(payload, dataIt.home, dataEn.home);
		clearMemoryCache();

		const totalTime = Date.now() - startTime;
		payload.logger.info(`🎉 Database seeding completed successfully in ${totalTime}ms with proper localization!`);
		payload.logger.info(`💾 Image cache had ${imageCache.size} entries during processing`);
	} catch (error) {
		payload.logger.error('❌ Error during seeding:', error);
		clearMemoryCache(); // Clean up on error
		throw error;
	}
};

// Individual seed functions for specific phases
export const seedCleanup = async ({
	payload,
	req: _req,
}: {
	payload: BasePayload;
	req: PayloadRequest;
}): Promise<void> => {
	try {
		payload.logger.info('🧹 Starting optimized database cleanup...');
		await cleanupDatabase(payload);
		clearMemoryCache();
		payload.logger.info('🎉 Database cleanup completed successfully!');
	} catch (error) {
		payload.logger.error('❌ Error during cleanup:', error);
		clearMemoryCache();
		throw error;
	}
};

export const seedPosts = async ({
	payload,
	req: _req,
}: {
	payload: BasePayload;
	req: PayloadRequest;
}): Promise<void> => {
	try {
		payload.logger.info('📝 Starting optimized multilingual posts seeding...');
		
		const dataIt = getDataForLocale('it');
		const dataEn = getDataForLocale('en');
		
		for (let i = 0; i < dataIt.posts.length; i++) {
			const postIt = dataIt.posts[i];
			const postEn = dataEn.posts[i] || postIt;
			await createBlogPost(payload, postIt, postEn);
			
			// Clear memory cache periodically
			if (i % 2 === 0) {
				clearMemoryCache();
			}
		}
		
		clearMemoryCache(); // Final cleanup
		payload.logger.info('🎉 Posts seeding completed successfully!');
	} catch (error) {
		payload.logger.error('❌ Error during posts seeding:', error);
		clearMemoryCache();
		throw error;
	}
};

export const seedTimeline = async ({
	payload,
	req: _req,
}: {
	payload: BasePayload;
	req: PayloadRequest;
}): Promise<void> => {
	try {
		payload.logger.info('🕐 Starting optimized multilingual timeline seeding...');
		
		const dataIt = getDataForLocale('it');
		const dataEn = getDataForLocale('en');
		await createGocciaData(payload, dataIt.goccia, dataEn.goccia);
		
		clearMemoryCache();
		payload.logger.info('🎉 Timeline seeding completed successfully!');
	} catch (error) {
		payload.logger.error('❌ Error during timeline seeding:', error);
		clearMemoryCache();
		throw error;
	}
};

export const seedAbout = async ({
	payload,
	req: _req,
}: {
	payload: BasePayload;
	req: PayloadRequest;
}): Promise<void> => {
	try {
		payload.logger.info('ℹ️ Starting optimized multilingual about seeding...');
		
		const dataIt = getDataForLocale('it');
		const dataEn = getDataForLocale('en');
		await createAboutData(payload, dataIt.about, dataEn.about);
		
		clearMemoryCache();
		payload.logger.info('🎉 About seeding completed successfully!');
	} catch (error) {
		payload.logger.error('❌ Error during about seeding:', error);
		clearMemoryCache();
		throw error;
	}
};

export const seedProgetto = async ({
	payload,
	req: _req,
}: {
	payload: BasePayload;
	req: PayloadRequest;
}): Promise<void> => {
	try {
		payload.logger.info('🏗️ Starting optimized multilingual progetto seeding...');
		
		const dataIt = getDataForLocale('it');
		const dataEn = getDataForLocale('en');
		await createProjectData(payload, dataIt.project, dataEn.project);
		
		clearMemoryCache();
		payload.logger.info('🎉 Progetto seeding completed successfully!');
	} catch (error) {
		payload.logger.error('❌ Error during progetto seeding:', error);
		clearMemoryCache();
		throw error;
	}
};

export const seedHome = async ({
	payload,
	req: _req,
}: {
	payload: BasePayload;
	req: PayloadRequest;
}): Promise<void> => {
	try {
		payload.logger.info('🏠 Starting optimized multilingual home seeding...');
		
		const dataIt = getDataForLocale('it');
		const dataEn = getDataForLocale('en');
		await createHomeData(payload, dataIt.home, dataEn.home);
		
		clearMemoryCache();
		payload.logger.info('🎉 Home seeding completed successfully!');
	} catch (error) {
		payload.logger.error('❌ Error during home seeding:', error);
		clearMemoryCache();
		throw error;
	}
};
