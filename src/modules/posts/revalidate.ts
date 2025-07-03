import type { Author, Post } from '@payload-types';

import { revalidatePath } from 'next/cache';
import type {
	CollectionAfterChangeHook,
	CollectionAfterDeleteHook,
} from 'payload';

export const revalidatePost: CollectionAfterChangeHook<Post | Author> = ({
	doc,
	previousDoc,
	req: { payload, context, locale },
	operation,
}) => {
	if (!context.disableRevalidate) {
		if (doc && 'posts' in doc) {
			const posts = doc.posts as Post[] | undefined;
			posts &&
				posts.length > 0 &&
				posts.forEach((post) => {
					if (post._status === 'published') {
						const path = `/${locale}/blog/${post.slug}`;
						payload.logger.info(`Revalidating page at path: ${path}`);
						revalidatePath(path);
					}
				});
		}

		if (doc && '_status' in doc && doc._status === 'published') {
			const path = `/${locale}/blog/${doc.slug}`;

			payload.logger.info(`Revalidating page at path: ${path}`);

			revalidatePath(path);
			// revalidateTag('blog-sitemap')
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
			const oldPath = `/${locale}/blog/${previousDoc.slug}`;

			payload.logger.info(`Revalidating old page at path: ${oldPath}`);

			revalidatePath(oldPath);
			// revalidateTag('blog-sitemap')
		}
		if (previousDoc && 'posts' in previousDoc) {
			const posts = previousDoc.posts as Post[] | undefined;
			posts &&
				posts.length > 0 &&
				posts.forEach((post) => {
					if (post._status === 'published') {
						const path = `/${locale}/blog/${post.slug}`;
						payload.logger.info(`Revalidating page at path: ${path}`);
						revalidatePath(path);
					}
				});
		}

		if (operation !== 'create') {
			payload.logger.info(`Revalidating home page`);
			revalidatePath('/');
			revalidatePath('/(frontend)/[locale]/blog', 'page');
		}
	}
	return doc;
};

export const revalidateDelete: CollectionAfterDeleteHook<Post | Author> = ({
	doc,
	req: { context, payload, locale },
}) => {
	if (!context.disableRevalidate) {
		if (doc && 'posts' in doc) {
			const posts = doc.posts as Post[] | undefined;
			posts &&
				posts.length > 0 &&
				posts.forEach((post) => {
					const path = `/${locale}/blog/${post.slug}`;
					payload.logger.info(`Revalidating page at path: ${path}`);
					revalidatePath(path);
				});
		}
		if (doc && '_status' in doc && doc._status === 'published') {
			const path = `/${locale}/blog/${doc.slug}`;
			payload.logger.info(`Revalidating page at path: ${path}`);
			revalidatePath(path);
		}
		revalidatePath('/');
		revalidatePath('/(frontend)/[locale]/blog', 'page');
		// revalidateTag('blog-sitemap')
	}

	return doc;
};
