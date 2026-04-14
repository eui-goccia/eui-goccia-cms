import type { Author } from '@payload-types';

import { revalidateTag } from 'next/cache';
import type {
	CollectionAfterChangeHook,
	CollectionAfterDeleteHook,
} from 'payload';

export const revalidateAuthor: CollectionAfterChangeHook<Author> = ({
	doc,
	req: { payload, context },
}) => {
	if (context.disableRevalidate) {
		return doc;
	}

	payload.logger.info(`Revalidating author: ${doc.slug}`);

	if (doc.slug) {
		revalidateTag(`authors_${doc.slug}`, {});
	}

	revalidateTag('authors', {});

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

	if (doc.slug) {
		revalidateTag(`authors_${doc.slug}`, {});
	}

	revalidateTag('authors', {});

	return doc;
};
