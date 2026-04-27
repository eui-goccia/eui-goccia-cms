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

function revalidateResourcePath(slug?: string | null) {
	if (!slug) {
		return;
	}

	const path = `/risorse/${slug}`;
	revalidatePath(path);

	for (const locale of localesForInvalidation) {
		revalidatePath(`/${locale}${path}`);
	}
}

function revalidateResourceTags(slug?: string | null) {
	if (slug) {
		revalidateTag(documentBaseTag('resources', slug), {});
	}

	revalidateTag(collectionBaseTag('resources'), {});

	for (const locale of localesForInvalidation) {
		if (slug) {
			revalidateTag(documentTag('resources', slug, locale), {});
		}
		revalidateTag(collectionTag('resources', locale), {});
	}
}

function revalidateResourceSlug(slug?: string | null) {
	revalidateResourcePath(slug);
	revalidateResourceTags(slug);
}

export const revalidateResource: CollectionAfterChangeHook = ({
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
		payload.logger.info(`Revalidating resource: ${doc.slug}`);
		revalidateResourceSlug(doc.slug);

		if (previousDoc?.slug && previousDoc.slug !== doc.slug) {
			revalidateResourceSlug(previousDoc.slug);
		}
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
		revalidateResourceSlug(doc.slug);
	}

	return doc;
};
