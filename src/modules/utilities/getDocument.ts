import configPromise from '@payload-config';
import type { Config } from '@payload-types';
import { cacheLife, cacheTag } from 'next/cache';
import type { SelectFromCollectionSlug } from 'node_modules/payload/dist/collections/config/types';
import { getPayload, type Where } from 'payload';
import type { Locales } from '@/i18n/routing';

type Collection = keyof Config['collections'];

export async function getDocument({
	collection,
	slug,
	depth = 0,
	draft = false,
	locale,
}: {
	collection: Collection;
	slug: string;
	depth?: number;
	draft?: boolean;
	locale?: Locales;
}): Promise<Config['collections'][Collection] | undefined> {
	'use cache';
	cacheLife('max');
	cacheTag(`${collection}_${slug}`);
	cacheTag(collection);

	const payload = await getPayload({ config: configPromise });
	const result = await payload.find({
		collection,
		where: { slug: { equals: slug } },
		depth,
		draft,
		overrideAccess: draft,
		locale,
	});

	return result.docs[0] as Config['collections'][Collection] | undefined;
}

export async function getDocuments({
	collection,
	depth = 0,
	limit = 12,
	page = 1,
	sort = 'publishedAt',
	draft = false,
	where,
	select,
	locale,
}: {
	collection: Collection;
	depth?: number;
	limit?: number;
	page?: number;
	sort?: string;
	draft?: boolean;
	where?: Where;
	select?: SelectFromCollectionSlug<Collection>;
	locale?: Locales;
}) {
	'use cache';
	cacheLife('max');
	cacheTag(collection);

	const payload = await getPayload({ config: configPromise });
	return payload.find({
		collection,
		depth,
		limit,
		page,
		sort,
		where,
		draft,
		overrideAccess: draft,
		select,
		locale,
	});
}
