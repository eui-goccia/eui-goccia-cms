import type { Event } from '@payload-types';

import { revalidateTag } from 'next/cache';
import type {
	CollectionAfterChangeHook,
	CollectionAfterDeleteHook,
} from 'payload';

export const revalidateEvent: CollectionAfterChangeHook<Event> = ({
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
	}

	return doc;
};

export const revalidateEventDelete: CollectionAfterDeleteHook<Event> = ({
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
	}

	return doc;
};
