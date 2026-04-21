import { revalidateTag } from 'next/cache';
import type {
	CollectionAfterChangeHook,
	CollectionAfterDeleteHook,
} from 'payload';

export const revalidateResource: CollectionAfterChangeHook = ({
	doc,
	req: { payload, context },
}) => {
	if (context.disableRevalidate) {
		return doc;
	}

	if (doc._status === 'published') {
		payload.logger.info(`Revalidating resource: ${doc.slug}`);
		revalidateTag(`resources_${doc.slug}`, {});
		revalidateTag('resources', {});
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
		revalidateTag(`resources_${doc.slug}`, {});
		revalidateTag('resources', {});
	}

	return doc;
};
