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

function revalidateResourceTags(slug: string) {
	revalidateTag(documentBaseTag('resources', slug), {});
	revalidateTag(collectionBaseTag('resources'), {});

	for (const locale of localesForInvalidation) {
		revalidateTag(documentTag('resources', slug, locale), {});
		revalidateTag(collectionTag('resources', locale), {});
	}
}

export const revalidateResource: CollectionAfterChangeHook = ({
	doc,
	req: { payload, context },
}) => {
	if (context.disableRevalidate) {
		return doc;
	}

	if (doc._status === 'published') {
		payload.logger.info(`Revalidating resource: ${doc.slug}`);
		revalidateResourceTags(doc.slug);
	}

	return doc;
};

export const revalidateResourceDelete: CollectionAfterDeleteHook = ({
	doc,
	req: { context, payload },
}) => {
	if (context.disableRevalidate) {
		return doc;
	}

	if (doc._status === 'published') {
		payload.logger.info(`Revalidating deleted resource: ${doc.slug}`);
		revalidateResourceTags(doc.slug);
	}

	return doc;
};
