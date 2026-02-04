import type { CollectionConfig } from 'payload';
import { anyone } from '@/modules/payload/access/anyone';
import { editor } from '@/modules/payload/access/editor';

export const Audio: CollectionConfig = {
	slug: 'audio',
	labels: {
		singular: 'Audio',
		plural: 'Audio',
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
	fields: [
		{
			name: 'title',
			type: 'text',
			admin: {
				description: 'Title of the audio file',
			},
			localized: true,
		},
		{
			name: 'description',
			type: 'text',
			required: false,
			admin: {
				description: 'Description of the audio file',
			},
			localized: true,
		},
	],
	upload: {
		disableLocalStorage: true,
		mimeTypes: ['audio/*'],
	},
};
