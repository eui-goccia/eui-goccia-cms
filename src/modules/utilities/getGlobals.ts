import configPromise from '@payload-config';
import type { Config } from '@payload-types';
import { unstable_cache } from 'next/cache';
import { getPayload } from 'payload';
import type { Locales } from '@/i18n/routing';

type Global = keyof Config['globals'];

export async function getGlobal(slug: Global, depth = 0, locale?: Locales) {
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
 */
export const getCachedGlobal = async (
	slug: Global,
	depth = 0,
	locale?: Locales
) => {
	const global = unstable_cache(
		async () => getGlobal(slug, depth, locale),
		[slug],
		{
			tags: [`global_${slug}`],
		}
	);

	return (await global()) as Config['globals'][Global];
};
