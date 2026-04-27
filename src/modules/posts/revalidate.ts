import type { Post } from '@payload-types';

import { revalidatePath, revalidateTag } from 'next/cache';
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

function revalidatePostPath(slug?: string | null) {
	if (!slug) {
		return;
	}

	const path = `/blog/${slug}`;
	revalidatePath(path);

	for (const locale of localesForInvalidation) {
		revalidatePath(`/${locale}${path}`);
	}
}

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

function revalidatePostSlug(slug?: string | null) {
	revalidatePostPath(slug);
	revalidatePostTags(slug);
}

export const revalidatePost: CollectionAfterChangeHook<Post> = ({
	doc,
	previousDoc,
	req: { payload, context },
}) => {
	if (context.disableRevalidate) {
		return doc;
	}

	const isPublished = doc._status === 'published';
	const wasPublished = previousDoc?._status === 'published';

	if (isPublished || wasPublished) {
		payload.logger.info(`Revalidating post: ${doc.slug}`);

		revalidatePostSlug(doc.slug);

		if (previousDoc?.slug && previousDoc.slug !== doc.slug) {
			revalidatePostSlug(previousDoc.slug);
		}
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

		revalidatePostSlug(doc.slug);
	}

	return doc;
};
