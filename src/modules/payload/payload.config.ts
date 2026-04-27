import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { sqliteAdapter } from '@payloadcms/db-sqlite';
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs';
import { en } from '@payloadcms/translations/languages/en';
import { it } from '@payloadcms/translations/languages/it';
import { buildConfig, type PayloadRequest } from 'payload';
import sharp from 'sharp';
import langs from '@/i18n/localization';
import { backupPlugin } from '../backup/plugin';
import { defaultLexical } from '../editor/lexical';
import { seoPlugin } from '../seo/plugin';
import { storagePlugin } from '../storage/plugin';
import { getServerSideOrigins, getServerSideURL } from '../utilities/getURL';
import { collections } from './collections';
import { globals } from './globals';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const isProduction = process.env.NODE_ENV === 'production';

function requireProductionEnv(name: string): string | undefined {
	const value = process.env[name]?.trim();

	if (isProduction && !value) {
		throw new Error(`${name} is required in production.`);
	}

	return value;
}

function getAllowedOrigins() {
	const origins = [
		...getServerSideOrigins(),
		...(process.env.ALLOWED_ORIGINS ?? '')
			.split(',')
			.map((origin) => origin.trim())
			.filter(Boolean),
	];

	return Array.from(new Set(origins));
}

const allowedOrigins = getAllowedOrigins();

export default buildConfig({
	serverURL: getServerSideURL(),
	csrf: allowedOrigins,
	cors: allowedOrigins,
	defaultDepth: 1,
	maxDepth: 4,
	defaultMaxTextLength: 20_000,
	graphQL: {
		disable: true,
	},
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
	secret:
		requireProductionEnv('PAYLOAD_SECRET') || 'development-payload-secret',
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
		push: false,
		client: {
			// Local dev uses DATABASE_URL; production can leave it unset and use Turso.
			url: process.env.DATABASE_URL || process.env.TURSO_DATABASE_URL || '',
			authToken: process.env.TURSO_AUTH_TOKEN,
		},
	}),
	jobs: {
		access: {
			run: ({ req }: { req: PayloadRequest }): boolean => {
				// Allow logged in users to execute this endpoint (default)
				if (req.user) {
					return true;
				}

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
	plugins: [
		seoPlugin,
		storagePlugin,
		backupPlugin,
		nestedDocsPlugin({
			collections: ['events'],
			generateLabel: (_, doc) => (doc.title ? String(doc.title) : ''),
			generateURL: (docs) =>
				docs.reduce((url, doc) => `${url}/${String(doc.slug)}`, ''),
		}),
	],
});
