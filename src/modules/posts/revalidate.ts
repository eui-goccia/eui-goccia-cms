/** biome-ignore-all lint/complexity/noForEach: faster to write */
/** biome-ignore-all lint/complexity/noExcessiveCognitiveComplexity: faster to write */
import type { Author, Post } from '@payload-types';

import { revalidatePath, revalidateTag } from 'next/cache';
import type {
	CollectionAfterChangeHook,
	CollectionAfterDeleteHook,
} from 'payload';

export const revalidatePost: CollectionAfterChangeHook<Post | Author> = ({
	doc,
	previousDoc,
	req: { payload, context },
	operation,
}) => {
	if (!context.disableRevalidate) {
		if (doc && 'posts' in doc) {
			const posts = doc.posts as Post[] | undefined;
			if (posts && posts.length > 0) {
				posts.forEach((post) => {
					if (post._status === 'published') {
						const path = `/(frontend)/[locale]/blog/${post.slug}`;
						payload.logger.info(`Revalidating page at path: ${path}`);

						// Use revalidateTag for more efficient invalidation
						revalidateTag(`it_posts_${post.slug}`, 'tag');
						revalidateTag(`en_posts_${post.slug}`, 'tag');
						revalidateTag('posts', 'tag');
						revalidateTag('blog-sitemap', 'tag');

						// Keep path revalidation for immediate effect
						revalidatePath(path, 'page');
					}
				});
			}
		}

		if (doc && '_status' in doc && doc._status === 'published') {
			const path = `/(frontend)/[locale]/blog/${doc.slug}`;

			payload.logger.info(`Revalidating page at path: ${path}`);

			// Use both tag and path revalidation for comprehensive cache clearing
			revalidateTag(`it_posts_${doc.slug}`, 'tag');
			revalidateTag(`en_posts_${doc.slug}`, 'tag');
			revalidateTag('it_posts', 'tag');
			revalidateTag('en_posts', 'tag');
			revalidateTag('posts', 'tag');
			revalidateTag('blog-sitemap', 'tag');

			revalidatePath(path, 'page');
		}

		// If the page was previously published, we need to revalidate the old path
		if (
			previousDoc &&
			'_status' in previousDoc &&
			previousDoc._status === 'published' &&
			doc &&
			'_status' in doc &&
			doc._status !== 'published'
		) {
			const oldPath = `/(frontend)/[locale]/blog/${previousDoc.slug}`;

			payload.logger.info(`Revalidating old page at path: ${oldPath}`);

			// Invalidate cache for unpublished post
			revalidateTag(`it_posts_${previousDoc.slug}`, 'tag');
			revalidateTag(`en_posts_${previousDoc.slug}`, 'tag');
			revalidateTag('posts', 'tag');
			revalidateTag('blog-sitemap', 'tag');

			revalidatePath(oldPath, 'page');
		}
		if (previousDoc && 'posts' in previousDoc) {
			const posts = previousDoc.posts as Post[] | undefined;
			if (posts && posts.length > 0) {
				posts.forEach((post) => {
					if (post._status === 'published') {
						const path = `/(frontend)/[locale]/blog/${post.slug}`;
						payload.logger.info(`Revalidating page at path: ${path}`);

						revalidateTag(`it_posts_${post.slug}`, 'tag');
						revalidateTag(`en_posts_${post.slug}`, 'tag');
						revalidateTag('posts', 'tag');

						revalidatePath(path, 'page');
					}
				});
			}

			if (operation !== 'create') {
				payload.logger.info('Revalidating home page and blog listing');
				revalidateTag('global-content', 'tag');
				revalidateTag('it_posts', 'tag');
				revalidateTag('en_posts', 'tag');
				revalidateTag('blog-sitemap', 'tag');

				revalidatePath('/');
				revalidatePath('/(frontend)/[locale]/blog', 'page');
			}
		}
		return doc;
	}
};

export const revalidateDelete: CollectionAfterDeleteHook<Post | Author> = ({
	doc,
	req: { context, payload },
}) => {
	if (!context.disableRevalidate) {
		if (doc && 'posts' in doc) {
			const posts = doc.posts as Post[] | undefined;
			if (posts && posts.length > 0) {
				posts.forEach((post) => {
					const path = `/(frontend)/[locale]/blog/${post.slug}`;
					payload.logger.info(`Revalidating page at path: ${path}`);

					revalidateTag(`it_posts_${post.slug}`, 'tag');
					revalidateTag(`en_posts_${post.slug}`, 'tag');
					revalidateTag('posts', 'tag');

					revalidatePath(path, 'page');
				});
			}
		}
		if (doc && '_status' in doc && doc._status === 'published') {
			const path = `/(frontend)/[locale]/blog/${doc.slug}`;
			payload.logger.info(`Revalidating page at path: ${path}`);

			// Clean up cache for deleted post
			revalidateTag(`it_posts_${doc.slug}`, 'tag');
			revalidateTag(`en_posts_${doc.slug}`, 'tag');
			revalidateTag('it_posts', 'tag');
			revalidateTag('en_posts', 'tag');
			revalidateTag('posts', 'tag');
			revalidateTag('blog-sitemap', 'tag');

			revalidatePath(path, 'page');
		}

		// Update global content cache
		revalidateTag('global-content', 'tag');
		revalidatePath('/');
		revalidatePath('/(frontend)/[locale]/blog', 'page');
	}

	return doc;
};
