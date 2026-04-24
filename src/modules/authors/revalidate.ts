import type { Author } from '@payload-types';

import { revalidateTag } from 'next/cache';
import type {
	CollectionAfterChangeHook,
	CollectionAfterDeleteHook,
} from 'payload';
import {
	collectionBaseTag,
	collectionTag,
	documentBaseTag,
	documentTag,
	localesForInvalidation,
} from '@/modules/utilities/cacheTags';

function revalidateAuthorTags(slug?: string | null) {
	if (slug) {
		revalidateTag(documentBaseTag('authors', slug), {});

		for (const locale of localesForInvalidation) {
			revalidateTag(documentTag('authors', slug, locale), {});
		}
	}

	revalidateTag(collectionBaseTag('authors'), {});

	for (const locale of localesForInvalidation) {
		revalidateTag(collectionTag('authors', locale), {});
	}
}

export const revalidateAuthor: CollectionAfterChangeHook<Author> = ({
	doc,
	req: { payload, context },
}) => {
	if (context.disableRevalidate) {
		return doc;
	}

	payload.logger.info(`Revalidating author: ${doc.slug}`);

	revalidateAuthorTags(doc.slug);

	return doc;
};

export const revalidateAuthorDelete: CollectionAfterDeleteHook<Author> = ({
	doc,
	req: { context, payload },
}) => {
	if (context.disableRevalidate) {
		return doc;
	}

	payload.logger.info(`Revalidating deleted author: ${doc.slug}`);

	revalidateAuthorTags(doc.slug);

	return doc;
};
