import { s3Storage } from '@payloadcms/storage-s3';
import { Audio } from '@/modules/storage/collections/Audio';
import { Images } from '@/modules/storage/collections/Images';

const isProduction = process.env.NODE_ENV === 'production';

function getS3Env(name: string): string {
	const value = process.env[name]?.trim() ?? '';

	if (isProduction && !value) {
		throw new Error(`${name} is required in production for S3 storage.`);
	}

	return value;
}

export const storagePlugin = s3Storage({
	collections: {
		[Audio.slug]: {
			disableLocalStorage: true,
			prefix: 'audio',
		},
		[Images.slug]: {
			disableLocalStorage: true,
			prefix: 'images',
		},
	},
	bucket: getS3Env('S3_BUCKET'),
	clientUploads: true,
	disableLocalStorage: true,
	enabled: true,
	config: {
		endpoint: getS3Env('S3_ENDPOINT'),
		region: getS3Env('S3_REGION'),
		credentials: {
			accessKeyId: getS3Env('S3_ACCESS_KEY_ID'),
			secretAccessKey: getS3Env('S3_SECRET_ACCESS_KEY'),
		},
		forcePathStyle: true,
	},
});
