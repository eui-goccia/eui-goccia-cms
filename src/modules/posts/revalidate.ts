import type { Post } from '@payload-types';

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

function revalidatePostTags(slug?: string | null) {
	if (slug) {
		revalidateTag(documentBaseTag('posts', slug), {});
	}

	revalidateTag(collectionBaseTag('posts'), {});

	for (const locale of localesForInvalidation) {
		if (slug) {
			revalidateTag(documentTag('posts', slug, locale), {});
		}
		revalidateTag(collectionTag('posts', locale), {});
	}
}

export const revalidatePost: CollectionAfterChangeHook<Post> = ({
	doc,
	req: { payload, context },
}) => {
	if (context.disableRevalidate) {
		return doc;
	}

	if (doc._status === 'published') {
		payload.logger.info(`Revalidating post: ${doc.slug}`);

		revalidatePostTags(doc.slug);
	}

	return doc;
};

export const revalidateDelete: CollectionAfterDeleteHook<Post> = ({
	doc,
	req: { context, payload },
}) => {
	if (context.disableRevalidate) {
		return doc;
	}

	if (doc._status === 'published') {
		payload.logger.info(`Revalidating deleted post: ${doc.slug}`);

		revalidatePostTags(doc.slug);
	}

	return doc;
};
