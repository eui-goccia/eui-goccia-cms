import { importExportPlugin } from '@payloadcms/plugin-import-export';
import type { Plugin } from 'payload';

export const backupPlugin: Plugin = importExportPlugin({
	collections: [
		{ slug: 'tags' },
		{ slug: 'images' },
		{ slug: 'audio' },
		{ slug: 'authors' },
		{ slug: 'posts' },
	],
	overrideExportCollection: ({ collection }) => ({
		...collection,
		admin: {
			...collection.admin,
			group: 'Administration',
		},
	}),
	overrideImportCollection: ({ collection }) => ({
		...collection,
		admin: {
			...collection.admin,
			group: 'Administration',
		},
	}),
});
