import { beforeEach, describe, expect, it } from 'vitest';
import { getServerSideOrigins, getServerSideURL } from './getURL';

const ENV_KEYS = [
	'NEXT_PUBLIC_SITE_URL',
	'VERCEL_ENV',
	'NEXT_PUBLIC_VERCEL_ENV',
	'VERCEL_URL',
	'NEXT_PUBLIC_VERCEL_URL',
	'VERCEL_BRANCH_URL',
	'NEXT_PUBLIC_VERCEL_BRANCH_URL',
	'VERCEL_PROJECT_PRODUCTION_URL',
	'NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL',
];

describe('runtime URL helpers', () => {
	beforeEach(() => {
		for (const key of ENV_KEYS) {
			delete process.env[key];
		}
	});

	it('uses an explicit site URL when configured', () => {
		process.env.NEXT_PUBLIC_SITE_URL = 'goccia.example/';
		process.env.VERCEL_ENV = 'preview';
		process.env.VERCEL_URL = 'preview.vercel.app';

		expect(getServerSideURL()).toBe('https://goccia.example');
	});

	it('uses the current deployment URL in Vercel preview deployments', () => {
		process.env.VERCEL_ENV = 'preview';
		process.env.VERCEL_PROJECT_PRODUCTION_URL = 'goccia.example';
		process.env.VERCEL_URL = 'goccia-git-feature.vercel.app';
		process.env.VERCEL_BRANCH_URL = 'goccia-feature-alias.vercel.app';

		expect(getServerSideURL()).toBe('https://goccia-git-feature.vercel.app');
	});

	it('supports framework-prefixed Vercel variables', () => {
		process.env.NEXT_PUBLIC_VERCEL_ENV = 'preview';
		process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL = 'goccia.example';
		process.env.NEXT_PUBLIC_VERCEL_URL = 'preview.vercel.app';

		expect(getServerSideURL()).toBe('https://preview.vercel.app');
	});

	it('uses the production URL in Vercel production deployments', () => {
		process.env.VERCEL_ENV = 'production';
		process.env.VERCEL_PROJECT_PRODUCTION_URL = 'goccia.example';
		process.env.VERCEL_URL = 'goccia-deployment.vercel.app';

		expect(getServerSideURL()).toBe('https://goccia.example');
	});

	it('returns all generated Vercel origins for server allowlists', () => {
		process.env.VERCEL_ENV = 'preview';
		process.env.VERCEL_PROJECT_PRODUCTION_URL = 'goccia.example';
		process.env.VERCEL_URL = 'goccia-git-feature.vercel.app';
		process.env.VERCEL_BRANCH_URL = 'goccia-feature-alias.vercel.app';

		expect(getServerSideOrigins()).toEqual([
			'https://goccia-git-feature.vercel.app',
			'https://goccia-feature-alias.vercel.app',
		]);
	});
});
