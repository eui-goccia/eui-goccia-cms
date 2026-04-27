import { importExportPlugin } from '@payloadcms/plugin-import-export';
import type { Access, CollectionConfig, Plugin } from 'payload';

export const importExportAdminAccess: Access = ({ req: { user } }) =>
	user?.role === 'admin';

const IMPORT_EXPORT_LIMIT = 1000;
const IMPORT_EXPORT_BATCH_SIZE = 100;

const importExportCollections = [
	'tags',
	'images',
	'audio',
	'authors',
	'posts',
	'events',
] as const;

function hardenImportExportCollection(
	collection: CollectionConfig
): CollectionConfig {
	return {
		...collection,
		access: {
			...collection.access,
			create: importExportAdminAccess,
			read: importExportAdminAccess,
			update: () => false,
			delete: importExportAdminAccess,
		},
		admin: {
			...collection.admin,
			group: 'Administration',
		},
	};
}

export const backupPlugin: Plugin = importExportPlugin({
	batchSize: IMPORT_EXPORT_BATCH_SIZE,
	exportLimit: IMPORT_EXPORT_LIMIT,
	importLimit: IMPORT_EXPORT_LIMIT,
	collections: importExportCollections.map((slug) => ({
		slug,
		export: {
			batchSize: IMPORT_EXPORT_BATCH_SIZE,
			disableJobsQueue: true,
			limit: IMPORT_EXPORT_LIMIT,
		},
		import: {
			batchSize: IMPORT_EXPORT_BATCH_SIZE,
			disableJobsQueue: true,
			limit: IMPORT_EXPORT_LIMIT,
		},
	})),
	overrideExportCollection: ({ collection }) =>
		hardenImportExportCollection(collection),
	overrideImportCollection: ({ collection }) =>
		hardenImportExportCollection(collection),
});
