import configPromise from '@payload-config';
import type { Config } from '@payload-types';
import { cacheLife, cacheTag } from 'next/cache';
import { getPayload } from 'payload';
import type { Locales } from '@/i18n/routing';

type Global = keyof Config['globals'];

export async function getGlobal(
	slug: Global,
	depth = 0,
	locale?: Locales
): Promise<Config['globals'][Global]> {
	'use cache';
	cacheLife('max');
	cacheTag(`global_${slug}`);

	const payload = await getPayload({ config: configPromise });
	return (await payload.findGlobal({
		slug,
		depth,
		locale,
	})) as Config['globals'][Global];
}
