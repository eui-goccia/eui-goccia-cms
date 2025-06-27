import 'server-only';
import type { Image } from '@payload-types';
import { getPayloadInstance } from '@/modules/payload';

export async function getImage(imageId: string): Promise<Image | undefined> {
	const payload = await getPayloadInstance();
	const image = await payload.findByID({
		collection: 'images',
		id: imageId,
	});
	return image;
}
