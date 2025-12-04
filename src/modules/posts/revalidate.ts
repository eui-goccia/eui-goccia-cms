/** biome-ignore-all lint/complexity/noForEach: faster to write */
/** biome-ignore-all lint/complexity/noExcessiveCognitiveComplexity: faster to write */
import type { Author, Post } from '@payload-types';

import { revalidatePath, updateTag } from 'next/cache';
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

						// Use updateTag for more efficient invalidation
						updateTag(`it_posts_${post.slug}`);
						updateTag(`en_posts_${post.slug}`);
						updateTag('posts');
						updateTag('blog-sitemap');

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
			updateTag(`it_posts_${doc.slug}`);
			updateTag(`en_posts_${doc.slug}`);
			updateTag('it_posts');
			updateTag('en_posts');
			updateTag('posts');
			updateTag('blog-sitemap');

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
			updateTag(`it_posts_${previousDoc.slug}`);
			updateTag(`en_posts_${previousDoc.slug}`);
			updateTag('posts');
			updateTag('blog-sitemap');

			revalidatePath(oldPath, 'page');
		}
		if (previousDoc && 'posts' in previousDoc) {
			const posts = previousDoc.posts as Post[] | undefined;
			if (posts && posts.length > 0) {
				posts.forEach((post) => {
					if (post._status === 'published') {
						const path = `/(frontend)/[locale]/blog/${post.slug}`;
						payload.logger.info(`Revalidating page at path: ${path}`);

						updateTag(`it_posts_${post.slug}`);
						updateTag(`en_posts_${post.slug}`);
						updateTag('posts');

						revalidatePath(path, 'page');
					}
				});
			}

			if (operation !== 'create') {
				payload.logger.info('Revalidating home page and blog listing');
				updateTag('global-content');
				updateTag('it_posts');
				updateTag('en_posts');
				updateTag('blog-sitemap');

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

					updateTag(`it_posts_${post.slug}`);
					updateTag(`en_posts_${post.slug}`);
					updateTag('posts');

					revalidatePath(path, 'page');
				});
			}
		}
		if (doc && '_status' in doc && doc._status === 'published') {
			const path = `/(frontend)/[locale]/blog/${doc.slug}`;
			payload.logger.info(`Revalidating page at path: ${path}`);

			// Clean up cache for deleted post
			updateTag(`it_posts_${doc.slug}`);
			updateTag(`en_posts_${doc.slug}`);
			updateTag('it_posts');
			updateTag('en_posts');
			updateTag('posts');
			updateTag('blog-sitemap');

			revalidatePath(path, 'page');
		}

		// Update global content cache
		updateTag('global-content');
		revalidatePath('/');
		revalidatePath('/(frontend)/[locale]/blog', 'page');
	}

	return doc;
};
