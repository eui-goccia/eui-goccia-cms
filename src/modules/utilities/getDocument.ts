import configPromise from '@payload-config';
import type { Config } from '@payload-types';
import { unstable_cache } from 'next/cache';
import type { SelectFromCollectionSlug } from 'node_modules/payload/dist/collections/config/types';
import { getPayload, type Where } from 'payload';
import { cache } from 'react';
import type { Locales } from '@/i18n/routing';

type Collection = keyof Config['collections'];

async function getDocument(
	collection: Collection,
	slug: string,
	depth = 0,
	draft = false,
	locale?: Locales
) {
	const payload = await getPayload({ config: configPromise });

	const result = await payload.find({
		collection,
		where: {
			slug: {
				equals: slug,
			},
		},
		depth,
		draft,
		overrideAccess: draft,
		locale,
	});

	return result.docs[0];
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug
 * Enhanced with longer cache times since content rarely changes
 */
export const getCachedDocument = cache(
	({
		collection,
		slug,
		depth,
		draft,
		locale,
	}: {
		collection: Collection;
		slug: string;
		depth?: number;
		draft?: boolean;
		locale?: Locales;
	}) => {
		const cachedFn = unstable_cache(
			async () => getDocument(collection, slug, depth, draft, locale),
			[collection, slug, String(depth), String(draft), String(locale)],
			{
				tags: [
					`${locale}_${collection}_${slug}`, // Specific document
					`${locale}_${collection}`, // Collection for this locale
					`${collection}`, // Cross-locale collection
					'global-content', // Site-wide invalidation
				],
				// Longer cache times since content rarely changes
				revalidate: draft ? false : 3600, // 1 hour for published content
			}
		);
		return cachedFn();
	}
);

async function getPaginatedDocuments(
	collection: Collection,
	depth = 0,
	limit = 12,
	page = 1,
	sort = 'publishedAt',
	draft = false,
	where?: Where,
	select?: SelectFromCollectionSlug<Collection>,
	locale?: Locales
) {
	const payload = await getPayload({ config: configPromise });

	const documents = await payload.find({
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

	return documents;
}

/**
 * Enhanced cached documents with React.cache for request deduplication
 * and improved cache strategy for mostly static content
 */
export const getCachedDocuments = cache(
	async ({
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
	}) => {
		// Create a more specific cache key that includes all parameters
		const whereKey = where ? JSON.stringify(where) : 'no-where';
		const selectKey = select ? JSON.stringify(select) : 'no-select';

		const cachedFn = unstable_cache(
			async () =>
				getPaginatedDocuments(
					collection,
					depth,
					limit,
					page,
					sort,
					draft,
					where,
					select,
					locale
				),
			[
				collection,
				String(locale),
				String(depth),
				String(limit),
				String(page),
				sort,
				String(draft),
				whereKey,
				selectKey,
			],
			{
				tags: [
					`${locale}_${collection}`, // Collection for this locale
					`${collection}`, // Cross-locale collection
					'global-content', // Site-wide invalidation
				],
				// Longer cache times since content rarely changes
				revalidate: draft ? false : 1800, // 30 minutes for published content lists
			}
		);
		return await cachedFn();
	}
);
