import fs from 'node:fs';
import path from 'node:path';

import type { BasePayload, PayloadRequest } from 'payload';
import type { 
	About,
	Author,
	GridBlock,
	Image, 
	ImageBlock, 
	LaGoccia, 
	Post, 
	Progetto, 
	QuoteBlock, 
	RichTextBlock, 
	TextBlock 
} from '../payload-types';

type ContentBlock = TextBlock | RichTextBlock | QuoteBlock | ImageBlock | GridBlock;

type GridItem = ImageBlock | TextBlock | RichTextBlock;

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
	content: RichTextBlock['content']
): Promise<RichTextBlock['content']> => {
	if (!content?.root?.children) return content;

	const processNode = async (node: { [k: string]: unknown; type: string; version: number }): Promise<{ [k: string]: unknown; type: string; version: number }> => {
		if (node.type === 'upload' && node.relationTo === 'images' && node.value) {
			const imageData = node.value as Image;
			const imageId = await getOrCreateImage(
				payload,
				imageData.caption,
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
				(node.children as any[]).map(processNode)
			);
			return {
				...node,
				children: processedChildren,
			};
		}

		return node;
	};

	const processedChildren = await Promise.all(
		(content.root.children as any[]).map(processNode)
	);

	return {
		...content,
		root: {
			...content.root,
			children: processedChildren,
		},
	};
};

const getAssetPath = (filename: string): string | null => {
	const assetMappings: Record<string, string> = {
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
	caption: string,
	filename?: string
): Promise<string> => {
	try {
		const existingImages = await payload.find({
			collection: 'images',
			where: {
				caption: {
					equals: caption,
				},
			},
		});

		if (existingImages.docs.length > 0) {
			return existingImages.docs[0].id;
		}

		let fileData: Buffer;
		let finalFilename: string;
		let assetPath: string | null = null;

		if (filename) {
			assetPath = getAssetPath(filename);
		}

		if (!assetPath) {
			assetPath = `images/homepage/home_1.webp`;
		}

		const resolvedPath = resolveAssetPath(assetPath);
		if (resolvedPath) {
			fileData = fs.readFileSync(resolvedPath);
			finalFilename = path.basename(resolvedPath);
		} else {
			console.warn(`Asset not found for "${caption}", filename: "${filename}". Using fallback.`);
			const fallbackPath = 'images/homepage/home_1.webp';
			const resolvedFallbackPath = resolveAssetPath(fallbackPath);
			if (resolvedFallbackPath) {
				fileData = fs.readFileSync(resolvedFallbackPath);
				finalFilename = 'fallback.webp';
			} else {
				throw new Error(`No fallback asset available. Tried paths: ${fallbackPath}`);
			}
		}

		const result = await payload.create({
			collection: 'images',
			data: {
				caption: caption,
			},
			file: {
				data: fileData,
				mimetype: path.extname(finalFilename).toLowerCase() === '.png' ? 'image/png' : 'image/webp',
				name: finalFilename,
				size: fileData.length,
			},
		});

		return result.id;
	} catch (error) {
		console.error(`Error creating image "${caption}":`, error);
		throw error;
	}
};

const getOrCreateAuthor = async (
	payload: BasePayload,
	name: string,
	bio?: string
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

		const result = await payload.create({
			collection: 'authors',
			data: {
				name: name,
				bio: bio || '',
				slug: name.toLowerCase().replace(/\s+/g, '-'),
			},
		});

		return result.id;
	} catch (error) {
		console.error(`Error creating author "${name}":`, error);
		throw error;
	}
};

const createBlogPost = async (payload: BasePayload, postData: Post): Promise<void> => {
	try {
		console.log(`Creating blog post: ${postData.title}`);

		const authorData = typeof postData.author === 'string' 
			? { name: 'Unknown Author', bio: '' }
			: postData.author as Author;

		const authorId = await getOrCreateAuthor(
			payload, 
			authorData.name, 
			authorData.bio || ''
		);

		const coverImageData = typeof postData.coverImage === 'string' 
			? { caption: 'Cover Image', filename: undefined }
			: postData.coverImage as Image;

		const coverImageId = await getOrCreateImage(
			payload,
			coverImageData.caption,
			coverImageData.filename || undefined
		);

		const processedContent = await Promise.all(
			postData.content.map(async (block: ContentBlock): Promise<ContentBlock> => {
				const cleanBlock = stripContentBlockIds(block);
				
				if (cleanBlock.blockType === 'image') {
					const imageBlock = cleanBlock as ImageBlock;
					const imageData = typeof imageBlock.image === 'string' 
						? { caption: 'Content Image', filename: undefined }
						: imageBlock.image as Image;

					const imageId = await getOrCreateImage(
						payload, 
						imageData.caption, 
						imageData.filename || undefined
					);
					return {
						...imageBlock,
						image: imageId,
					};
				}

				if (cleanBlock.blockType === 'richText') {
					const richTextBlock = cleanBlock as RichTextBlock;
					const processedContent = await processRichTextContent(
						payload,
						richTextBlock.content
					);
					return {
						...richTextBlock,
						content: processedContent,
					};
				}

				if (cleanBlock.blockType === 'quote') {
					const quoteBlock = cleanBlock as QuoteBlock;
					const processedContent = await processRichTextContent(
						payload,
						quoteBlock.content
					);
					return {
						...quoteBlock,
						content: processedContent,
					};
				}
				
				if (cleanBlock.blockType === 'grid') {
					const gridBlock = cleanBlock as GridBlock;
					if (gridBlock.items) {
						const processedItems = await Promise.all(
							gridBlock.items.map(async (item: GridItem): Promise<GridItem> => {
								if (item.blockType === 'image') {
									const imageItem = item as ImageBlock;
									const imageData = typeof imageItem.image === 'string' 
										? { caption: 'Grid Image', filename: undefined }
										: imageItem.image as Image;

									const imageId = await getOrCreateImage(
										payload, 
										imageData.caption, 
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

								return item;
							})
						);
						return {
							...gridBlock,
							items: processedItems,
						};
					}
				}
				
				return cleanBlock;
			})
		);

		await payload.create({
			collection: 'posts',
			data: {
				title: postData.title,
				description: postData.description,
				content: processedContent,
				meta: postData.meta,
				coverImage: coverImageId,
				author: authorId,
				publishedAt: postData.publishedAt,
				slug: postData.slug,
				_status: postData._status,
			},
		});

		console.log(`✅ Created blog post: ${postData.title}`);
	} catch (error) {
		console.error(`❌ Error creating blog post "${postData.title}":`, error);
		throw error;
	}
};

const createGocciaData = async (payload: BasePayload, gocciaData: LaGoccia): Promise<void> => {
	try {
		console.log('Creating Goccia timeline data...');

		const processedTimeline = gocciaData.timeline ? await Promise.all(
			gocciaData.timeline.map(async (event) => {
				const coverData = typeof event.cover === 'string' 
					? { caption: event.title || 'Timeline Event', filename: undefined }
					: event.cover as Image;

				const coverId = await getOrCreateImage(
					payload, 
					coverData.caption, 
					coverData.filename || undefined
				);
				return {
					...event,
					cover: coverId,
				};
			})
		) : [];

		await payload.updateGlobal({
			slug: 'la-goccia',
			data: {
				description: gocciaData.description,
				timeline: processedTimeline,
			},
		});

		console.log('✅ Created Goccia data');
	} catch (error) {
		console.error('❌ Error creating Goccia data:', error);
		throw error;
	}
};

const createProjectData = async (payload: BasePayload, projectData: Progetto): Promise<void> => {
	try {
		console.log('Creating Project data...');

		const processedSections = projectData.sections ? await Promise.all(
			projectData.sections.map(async (section) => {
				const processedContent = await Promise.all(
					section.content.map(async (block: ContentBlock): Promise<ContentBlock> => {
						const cleanBlock = stripContentBlockIds(block);
						
						if (cleanBlock.blockType === 'image') {
							const imageBlock = cleanBlock as ImageBlock;
							const imageData = typeof imageBlock.image === 'string' 
								? { caption: 'Project Image', filename: undefined }
								: imageBlock.image as Image;

							const imageId = await getOrCreateImage(
								payload, 
								imageData.caption, 
								imageData.filename || undefined
							);
							return {
								...imageBlock,
								image: imageId,
							};
						}

						if (cleanBlock.blockType === 'richText') {
							const richTextBlock = cleanBlock as RichTextBlock;
							const processedContent = await processRichTextContent(
								payload,
								richTextBlock.content
							);
							return {
								...richTextBlock,
								content: processedContent,
							};
						}

						if (cleanBlock.blockType === 'quote') {
							const quoteBlock = cleanBlock as QuoteBlock;
							const processedContent = await processRichTextContent(
								payload,
								quoteBlock.content
							);
							return {
								...quoteBlock,
								content: processedContent,
							};
						}
						
						if (cleanBlock.blockType === 'grid') {
							const gridBlock = cleanBlock as GridBlock;
							if (gridBlock.items) {
								const processedItems = await Promise.all(
									gridBlock.items.map(async (item: GridItem): Promise<GridItem> => {
										if (item.blockType === 'image') {
											const imageItem = item as ImageBlock;
											const imageData = typeof imageItem.image === 'string' 
												? { caption: 'Project Grid Image', filename: undefined }
												: imageItem.image as Image;

											const imageId = await getOrCreateImage(
												payload, 
												imageData.caption, 
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

										return item;
									})
								);
								return {
									...gridBlock,
									items: processedItems,
								};
							}
						}
						
						return cleanBlock;
					})
				);

				return {
					...section,
					content: processedContent,
				};
			})
		) : [];

		await payload.updateGlobal({
			slug: 'progetto',
			data: {
				sections: processedSections,
			},
		});

		console.log('✅ Created Project data');
	} catch (error) {
		console.error('❌ Error creating Project data:', error);
		throw error;
	}
};

const createAboutData = async (payload: BasePayload, aboutData: About): Promise<void> => {
	try {
		console.log('Creating About data...');

		const processedPartners = aboutData.partners ? await Promise.all(
			aboutData.partners.map(async (partner) => {
				const logoData = typeof partner.logo === 'string' 
					? { caption: `Logo ${partner.name}`, filename: undefined }
					: partner.logo as Image;

				const logoId = await getOrCreateImage(
					payload,
					logoData.caption,
					logoData.filename || undefined
				);

				return {
					...partner,
					logo: logoId,
				};
			})
		) : [];

		await payload.updateGlobal({
			slug: 'about',
			data: {
				description: aboutData.description,
				partners: processedPartners,
			},
		});

		console.log('✅ Created About data');
	} catch (error) {
		console.error('❌ Error creating About data:', error);
		throw error;
	}
};

const cleanupDatabase = async (payload: BasePayload): Promise<void> => {
	try {
		console.log('🧹 Cleaning up existing data...');

		// Delete posts first
		console.log('🗑️  Deleting all posts...');
		
			await payload.delete({
				collection: 'posts',
				where:{
					exists:{}
				}
			});
		console.log(`✅ Deleted all posts`);

		// Delete authors
		console.log('🗑️  Deleting all authors...');
		
		
			await payload.delete({
				collection: 'authors',
				where:{
					exists:{}
				}
			});
		console.log(`✅ Deleted all authors`);

		// Delete images
		console.log('🗑️  Deleting all images...');
		
			await payload.delete({
				collection: 'images',
				where:{
					exists:{}
				}
			});
		console.log(`✅ Deleted all images`);

		console.log('🎯 Database cleanup completed!');
	} catch (error) {
		console.error('❌ Error during cleanup:', error);
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
	try {
		console.log('🌱 Starting database seeding...');

		const { posts }: { posts: Post[] } = await import('../../../app/(frontend)/[locale]/blog/data');
		const { goccia }: { goccia: LaGoccia } = await import('../../../app/(frontend)/[locale]/la-goccia/data');
		const { project }: { project: Progetto } = await import('../../../app/(frontend)/[locale]/progetto/data');
		const { about }: { about: About } = await import('../../../app/(frontend)/[locale]/about/data');

		// Clean up existing data first
		await cleanupDatabase(payload);

		console.log('🔄 Preparing to seed fresh data...');

		console.log('📝 Creating blog posts...');
		for (const post of posts) {
			await createBlogPost(payload, post);
		}

		await createGocciaData(payload, goccia);

		await createProjectData(payload, project);

		await createAboutData(payload, about);

		console.log('🎉 Database seeding completed successfully!');
	} catch (error) {
		console.error('❌ Error during seeding:', error);
		throw error;
	}
};
