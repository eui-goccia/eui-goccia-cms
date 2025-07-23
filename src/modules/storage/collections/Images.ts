import {
	APIError,
	type CollectionBeforeValidateHook,
	type CollectionConfig,
} from 'payload';
import { getPlaiceholder } from 'plaiceholder';
import { anyone } from '@/modules/payload/access/anyone';
import { editor } from '@/modules/payload/access/editor';

const generateBlurHash: CollectionBeforeValidateHook = async ({
	data,
	operation,
	req,
}) => {
	if (operation === 'create' || operation === 'update') {
		try {
			const buffer = req?.file?.data;

			if (buffer) {
				const { base64 } = await getPlaiceholder(buffer, { size: 10 });

				return {
					...data,
					blurHash: base64,
				};
			}
		} catch (error) {
			throw new APIError(`Failed to generate blur data url: ${error}`);
		}
	}
};

export const Images: CollectionConfig = {
	slug: 'images',
	labels: {
		singular: 'Immagine',
		plural: 'Immagini',
	},
	admin: {
		group: 'Storage',
	},
	access: {
		read: anyone,
		create: editor,
		delete: editor,
		update: editor,
	},
	hooks: {
		beforeValidate: [generateBlurHash],
	},
	fields: [
		{
			name: 'alt',
			type: 'text',
			admin: {
				description: 'Alt text of the image',
			},
			localized: true,
		},
		{
			name: 'caption',
			type: 'text',
			required: false,
			admin: {
				description: 'Caption/Copyright of the image',
			},
			localized: true,
		},
		{
			name: 'blurHash',
			type: 'text',
			admin: {
				hidden: true,
			},
		},
	],
	upload: {
		disableLocalStorage: true,
		mimeTypes: ['image/*'],
		adminThumbnail: 'thumbnail',
		crop: true,
		focalPoint: true,
		formatOptions: { format: 'webp' },
		imageSizes: [
			{
				name: 'thumbnail',
				width: 300,
				position: 'centre',
				fit: 'inside',
				formatOptions: { format: 'webp' },
			},
			{
				name: 'medium',
				width: 900,
				position: 'centre',
				fit: 'inside',
				formatOptions: { format: 'webp' },
			},
			{
				name: 'large',
				width: 1400,
				position: 'centre',
				fit: 'inside',
				formatOptions: { format: 'webp' },
			},
			{
				name: 'xlarge',
				width: 1920,
				position: 'centre',
				fit: 'inside',
				formatOptions: { format: 'webp' },
			},
			{
				name: 'og',
				width: 1200,
				height: 630,
				crop: 'center',
				position: 'centre',
				fit: 'inside',
				formatOptions: { format: 'webp' },
			},
		],
	},
};
