import { beforeEach, describe, expect, it } from 'vitest';
import { generateURL, getCanonicalPath } from './plugin';

describe('SEO canonical URLs', () => {
	beforeEach(() => {
		process.env.NEXT_PUBLIC_SITE_URL = 'https://goccia.example';
		process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL = '';
		process.env.NEXT_PUBLIC_VERCEL_URL = '';
		process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL = '';
	});

	it('generates collection-specific canonical paths', () => {
		expect(
			getCanonicalPath({ collection: 'posts', doc: { slug: 'articolo' } })
		).toBe('/blog/articolo');
		expect(
			getCanonicalPath({
				collection: 'events',
				doc: {
					slug: 'sessione',
					breadcrumbs: [{ url: '/festival/sessione' }],
				},
			})
		).toBe('/eventi/festival/sessione');
		expect(
			getCanonicalPath({ collection: 'resources', doc: { slug: 'report' } })
		).toBe('/risorse/report');
	});

	it('prefixes canonical paths with the configured site URL', () => {
		expect(
			generateURL({
				collectionConfig: { slug: 'posts' },
				doc: { slug: 'articolo' },
			} as never)
		).toBe('https://goccia.example/blog/articolo');
	});
});
