import type { Post } from '@payload-types';

import { revalidateTag } from 'next/cache';
import type {
	CollectionAfterChangeHook,
	CollectionAfterDeleteHook,
} from 'payload';

export const revalidatePost: CollectionAfterChangeHook<Post> = ({
	doc,
	req: { payload, context },
}) => {
	if (context.disableRevalidate) {
		return doc;
	}

	if (doc._status === 'published') {
		payload.logger.info(`Revalidating post: ${doc.slug}`);

		// Revalidate specific post tag
		revalidateTag(`posts_${doc.slug}`, {});

		// Revalidate collection-level tag
		revalidateTag('posts', {});
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

		// Clean up cache for deleted post
		revalidateTag(`posts_${doc.slug}`, {});
		revalidateTag('posts', {});
	}

	return doc;
};
