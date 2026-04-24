import 'server-only';

import configPromise from '@payload-config';
import type { Config } from '@payload-types';
import { cacheLife, cacheTag } from 'next/cache';
import type { SelectFromCollectionSlug } from 'node_modules/payload/dist/collections/config/types';
import { getPayload, type Where } from 'payload';
import type { Locales } from '@/i18n/routing';
import {
	collectionBaseTag,
	collectionTag,
	documentBaseTag,
	documentTag,
} from './cacheTags';

type Collection = keyof Config['collections'];

interface GetDocumentArgs {
	collection: Collection;
	slug: string;
	depth?: number;
	draft?: boolean;
	locale?: Locales;
}

interface GetDocumentsArgs {
	collection: Collection;
	depth?: number;
	limit?: number;
	page?: number;
	sort?: string;
	draft?: boolean;
	where?: Where;
	select?: SelectFromCollectionSlug<Collection>;
	locale?: Locales;
}

async function findDocumentUncached({
	collection,
	slug,
	depth = 0,
	draft = false,
	locale,
}: GetDocumentArgs): Promise<Config['collections'][Collection] | undefined> {
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

async function findPublishedDocumentCached({
	collection,
	slug,
	depth = 0,
	locale,
}: GetDocumentArgs): Promise<Config['collections'][Collection] | undefined> {
	'use cache';
	cacheLife('max');
	cacheTag(
		documentBaseTag(collection, slug),
		documentTag(collection, slug, locale)
	);

	const payload = await getPayload({ config: configPromise });
	const result = await payload.find({
		collection,
		where: { slug: { equals: slug } },
		depth,
		draft: false,
		overrideAccess: false,
		locale,
	});

	return result.docs[0] as Config['collections'][Collection] | undefined;
}

export async function getDocument(
	args: GetDocumentArgs
): Promise<Config['collections'][Collection] | undefined> {
	if (args.draft) {
		return findDocumentUncached(args);
	}

	return findPublishedDocumentCached(args);
}

async function findDocumentsUncached({
	collection,
	depth = 0,
	limit = 12,
	page = 1,
	sort = 'publishedAt',
	draft = false,
	where,
	select,
	locale,
}: GetDocumentsArgs) {
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

async function findPublishedDocumentsCached({
	collection,
	depth = 0,
	limit = 12,
	page = 1,
	sort = 'publishedAt',
	where,
	select,
	locale,
}: GetDocumentsArgs) {
	'use cache';
	cacheLife('max');
	cacheTag(collectionBaseTag(collection), collectionTag(collection, locale));

	const payload = await getPayload({ config: configPromise });
	return payload.find({
		collection,
		depth,
		limit,
		page,
		sort,
		where,
		draft: false,
		overrideAccess: false,
		select,
		locale,
	});
}

export async function getDocuments(args: GetDocumentsArgs) {
	if (args.draft) {
		return findDocumentsUncached(args);
	}

	return findPublishedDocumentsCached(args);
}
