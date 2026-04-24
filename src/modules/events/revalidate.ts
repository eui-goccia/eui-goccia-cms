import type { Event } from '@payload-types';

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

export const revalidateEvent: CollectionAfterChangeHook<Event> = async ({
	doc,
	req: { payload, context },
}) => {
	if (context.disableRevalidate) {
		return doc;
	}

	if (doc._status === 'published') {
		payload.logger.info(`Revalidating event: ${doc.slug}`);

		revalidateEventDocumentTags(doc.slug);
		revalidateEventListTags();

		const children = await payload.find({
			collection: 'events',
			where: { parent: { equals: doc.id } },
			depth: 0,
			limit: 100,
			context: { disableRevalidate: true },
		});

		for (const child of children.docs) {
			if (child.slug) {
				revalidateEventDocumentTags(child.slug);
			}
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

		revalidateEventDocumentTags(doc.slug);
		revalidateEventListTags();

		const children = await payload.find({
			collection: 'events',
			where: { parent: { equals: doc.id } },
			depth: 0,
			limit: 100,
			context: { disableRevalidate: true },
		});

		for (const child of children.docs) {
			if (child.slug) {
				revalidateEventDocumentTags(child.slug);
			}
		}
	}

	return doc;
};
