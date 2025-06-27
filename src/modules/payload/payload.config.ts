import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres';
import { en } from '@payloadcms/translations/languages/en';
import { it } from '@payloadcms/translations/languages/it';
import { buildConfig } from 'payload';
import sharp from 'sharp';
import { defaultLexical } from '../editor/lexical';
import { seoPlugin } from '../seo/plugin';
import { storagePlugin } from '../storage/plugin';
import { collections } from './collections';
import { migrations } from './db/migrations';
import { globals } from './globals';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
	i18n: {
		fallbackLanguage: 'it',
		supportedLanguages: { it, en },
	},
	// localization: {
	// 		defaultLocale: langs.defaultLocale,
	// 		locales: langs.locales,
	// 		fallback: true,
	// },
	admin: {
		user: 'users',
		importMap: {
			baseDir: path.resolve(dirname),
		},
		livePreview: {
			breakpoints: [
				{
					label: 'Mobile',
					name: 'mobile',
					width: 375,
					height: 667,
				},
				{
					label: 'Tablet',
					name: 'tablet',
					width: 768,
					height: 1024,
				},
				{
					label: 'Desktop',
					name: 'desktop',
					width: 1440,
					height: 900,
				},
			],
		},
	},
	globals,
	collections,
	editor: defaultLexical,
	secret: process.env.PAYLOAD_SECRET || '',
	typescript: {
		outputFile: path.resolve(dirname, 'payload-types.ts'),
	},
	db: vercelPostgresAdapter({
		idType: 'uuid',
		generateSchemaOutputFile: path.resolve(
			dirname,
			'./db/payload-generated-schema.ts'
		),
		migrationDir: path.resolve(dirname, './db/migrations'),
		prodMigrations: migrations,
		pool: {
			connectionString: process.env.DATABASE_URL || '',
		},
	}),
	sharp,
	plugins: [seoPlugin, storagePlugin],
});
