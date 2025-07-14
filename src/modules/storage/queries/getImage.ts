import 'server-only';
import type { Image } from '@payload-types';
import { unstable_cache } from 'next/cache';
import { cache } from 'react';
import { getPayloadInstance } from '@/modules/payload';

/**
 * Enhanced cached image fetching with React.cache for deduplication
 * and aggressive caching since images rarely change
 */
export const getImage = cache(
	async (imageId: string): Promise<Image | undefined> => {
		if (!imageId) return undefined;

		return await unstable_cache(
			async () => {
				const payload = await getPayloadInstance();
				return payload.findByID({
					collection: 'images',
					id: imageId,
					depth: 0, // Images don't need deep relations
				});
			},
			['image', imageId],
			{
				tags: [
					`image_${imageId}`, // Specific image
					'images', // All images
					'global-content', // Site-wide invalidation
				],
				// Very long cache times since images rarely change
				revalidate: 86400, // 24 hours
			}
		)();
	}
);

/**
 * Get multiple images efficiently with deduplication
 */
export const getImages = cache(
	async (imageIds: string[]): Promise<(Image | undefined)[]> => {
		if (!imageIds.length) return [];

		// Use Promise.all to fetch images in parallel while maintaining React.cache benefits
		return Promise.all(imageIds.map((id) => getImage(id)));
	}
);
