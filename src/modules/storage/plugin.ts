import { s3Storage } from '@payloadcms/storage-s3';
import { Images } from '@/modules/storage/collections/Images';

export const storagePlugin = s3Storage({
	collections: {
		[Images.slug]: {
			disableLocalStorage: true,
			prefix: 'images',
		},
	},
	bucket: process.env.S3_BUCKET!,
	disableLocalStorage: true,
	enabled: true,
	config: {
		endpoint: process.env.S3_ENDPOINT!,
		region: process.env.S3_REGION!,
		credentials: {
			accessKeyId: process.env.S3_ACCESS_KEY_ID!,
			secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
		},
		forcePathStyle: true,
	},
});
