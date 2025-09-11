import 'server-only';
import type { Image } from '@payload-types';
import { getPayloadInstance } from '@/modules/payload';

export const getImage = async (imageId: string): Promise<Image | undefined> => {
	if (!imageId) {
		return;
	}
	const payload = await getPayloadInstance();
	return payload.findByID({
		collection: 'images',
		id: imageId,
		depth: 0, // Images don't need deep relations
	});
};

export const getImages = async (
	imageIds: string[]
): Promise<(Image | undefined)[]> => {
	if (!imageIds.length) {
		return [];
	}
	return await Promise.all(imageIds.map((id) => getImage(id)));
};
