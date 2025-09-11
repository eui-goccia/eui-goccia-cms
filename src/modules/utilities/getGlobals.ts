import configPromise from '@payload-config';
import type { Config } from '@payload-types';
import { unstable_cache } from 'next/cache';
import { getPayload } from 'payload';
import { cache } from 'react';
import type { Locales } from '@/i18n/routing';

type Global = keyof Config['globals'];

async function getGlobal(slug: Global, depth = 0, locale?: Locales) {
	const payload = await getPayload({ config: configPromise });
	const global = await payload.findGlobal({
		slug,
		depth,
		locale,
	});

	return global;
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug
 * Enhanced with React.cache for deduplication and longer cache times
 */
export const getCachedGlobal = cache(
	async (slug: Global, depth = 0, locale?: Locales) => {
		const global = unstable_cache(
			async () => getGlobal(slug, depth, locale),
			[slug, String(depth), String(locale)],
			{
				tags: [
					`global_${slug}`, // Specific global
					`global_${slug}_${locale}`, // Global for specific locale
				],
			}
		);

		return (await global()) as Config['globals'][Global];
	}
);
