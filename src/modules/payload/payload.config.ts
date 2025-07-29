import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { sqliteAdapter } from '@payloadcms/db-sqlite';
import { en } from '@payloadcms/translations/languages/en';
import { it } from '@payloadcms/translations/languages/it';
import { buildConfig, type PayloadRequest } from 'payload';
import sharp from 'sharp';
import langs from '@/i18n/localization';
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
		fallbackLanguage: langs.defaultLocale,
		supportedLanguages: { it, en },
	},
	localization: {
		defaultLocale: langs.defaultLocale,
		locales: langs.locales,
		fallback: true,
	},
	admin: {
		user: 'users',
		importMap: {
			baseDir: path.resolve(dirname),
		},
		components: {
			beforeDashboard: ['./fields/BeforeDashboard'],
			providers: ['./components/LocaleThemeProvider'],
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
	db: sqliteAdapter({
		idType: 'uuid',
		generateSchemaOutputFile: path.resolve(
			dirname,
			'./db/payload-generated-schema.ts'
		),
		migrationDir: path.resolve(dirname, './db/migrations'),
		prodMigrations: migrations,
		client: {
			url: process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL || '',
			authToken: process.env.TURSO_AUTH_TOKEN,
		},
	}),
	jobs: {
		access: {
			run: ({ req }: { req: PayloadRequest }): boolean => {
				// Allow logged in users to execute this endpoint (default)
				if (req.user) return true;

				// If there is no logged in user, then check
				// for the Vercel Cron secret to be present as an
				// Authorization header:
				const authHeader = req.headers.get('authorization');
				return authHeader === `Bearer ${process.env.CRON_SECRET}`;
			},
		},
		tasks: [],
	},
	sharp,
	plugins: [seoPlugin, storagePlugin],
});
