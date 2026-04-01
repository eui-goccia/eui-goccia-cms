import type { Event } from '@payload-types';

import { revalidateTag } from 'next/cache';
import type {
	CollectionAfterChangeHook,
	CollectionAfterDeleteHook,
} from 'payload';

export const revalidateEvent: CollectionAfterChangeHook<Event> = async ({
	doc,
	req: { payload, context },
}) => {
	if (context.disableRevalidate) {
		return doc;
	}

	if (doc._status === 'published') {
		payload.logger.info(`Revalidating event: ${doc.slug}`);

		revalidateTag(`events_${doc.slug}`, {});
		revalidateTag('events', {});

		const children = await payload.find({
			collection: 'events',
			where: { parent: { equals: doc.id } },
			depth: 0,
			limit: 100,
			context: { disableRevalidate: true },
		});

		for (const child of children.docs) {
			if (child.slug) {
				revalidateTag(`events_${child.slug}`, {});
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

		revalidateTag(`events_${doc.slug}`, {});
		revalidateTag('events', {});

		const children = await payload.find({
			collection: 'events',
			where: { parent: { equals: doc.id } },
			depth: 0,
			limit: 100,
			context: { disableRevalidate: true },
		});

		for (const child of children.docs) {
			if (child.slug) {
				revalidateTag(`events_${child.slug}`, {});
			}
		}
	}

	return doc;
};
