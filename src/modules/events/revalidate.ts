import type { Event } from '@payload-types';

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
import { getEventHref } from './paths';

function revalidateEventDocumentTags(slug?: string | null) {
	if (!slug) {
		return;
	}

	revalidateTag(documentBaseTag('events', slug), {});
	for (const locale of localesForInvalidation) {
		revalidateTag(documentTag('events', slug, locale), {});
	}
}

function revalidateEventListTags() {
	revalidateTag(collectionBaseTag('events'), {});

	for (const locale of localesForInvalidation) {
		revalidateTag(collectionTag('events', locale), {});
	}
}

function revalidateEventPath(event?: Partial<Event> | null) {
	if (!event?.slug) {
		return;
	}

	const path = getEventHref(event as Event);
	revalidatePath(path);

	for (const locale of localesForInvalidation) {
		revalidatePath(`/${locale}${path}`);
	}
}

function revalidateEventDocument(event?: Partial<Event> | null) {
	revalidateEventPath(event);
	revalidateEventDocumentTags(event?.slug);
}

export const revalidateEvent: CollectionAfterChangeHook<Event> = async ({
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
		payload.logger.info(`Revalidating event: ${doc.slug}`);

		revalidateEventDocument(doc);

		if (previousDoc?.slug && previousDoc.slug !== doc.slug) {
			revalidateEventDocument(previousDoc);
		}

		revalidateEventListTags();

		const children = await payload.find({
			collection: 'events',
			where: { parent: { equals: doc.id } },
			draft: true,
			depth: 0,
			limit: 100,
			overrideAccess: true,
			context: { disableRevalidate: true },
		});

		for (const child of children.docs) {
			revalidateEventDocument(child);
		}
	}

	return doc;
};

export const revalidateEventDelete: CollectionAfterDeleteHook<Event> = async ({
	doc,
	req: { context, payload },
}) => {
	if (context.disableRevalidate) {
		return doc;
	}

	if (doc._status === 'published') {
		payload.logger.info(`Revalidating deleted event: ${doc.slug}`);

		revalidateEventDocument(doc);
		revalidateEventListTags();

		const children = await payload.find({
			collection: 'events',
			where: { parent: { equals: doc.id } },
			draft: true,
			depth: 0,
			limit: 100,
			overrideAccess: true,
			context: { disableRevalidate: true },
		});

		for (const child of children.docs) {
			revalidateEventDocument(child);
		}
	}

	return doc;
};
