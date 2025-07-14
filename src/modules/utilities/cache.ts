import 'server-only';
import { revalidatePath, revalidateTag } from 'next/cache';
import type { Locales } from '@/i18n/routing';

/**
 * Cache management utilities for efficient invalidation
 * Optimized for live preview and content updates
 */

export type CacheScope = 'global' | 'posts' | 'images' | 'authors' | 'tags';

/**
 * Invalidate specific content by type and identifier
 */
export function invalidateContent(
	scope: CacheScope,
	identifier?: string,
	locale?: Locales
): void {
	const tags: string[] = [];

	switch (scope) {
		case 'global':
			if (identifier) {
				tags.push(`global_${identifier}`);
				if (locale) {
					tags.push(`global_${identifier}_${locale}`);
				}
			}
			tags.push('global-content');
			break;

		case 'posts':
			if (identifier) {
				if (locale) {
					tags.push(`${locale}_posts_${identifier}`);
				} else {
					// Invalidate for both locales
					tags.push(`it_posts_${identifier}`);
					tags.push(`en_posts_${identifier}`);
				}
			}
			if (locale) {
				tags.push(`${locale}_posts`);
			} else {
				tags.push('it_posts');
				tags.push('en_posts');
			}
			tags.push('posts');
			tags.push('blog-sitemap');
			break;

		case 'images':
			if (identifier) {
				tags.push(`image_${identifier}`);
			}
			tags.push('images');
			break;

		case 'authors':
		case 'tags':
			if (identifier) {
				if (locale) {
					tags.push(`${locale}_${scope}_${identifier}`);
				} else {
					tags.push(`it_${scope}_${identifier}`);
					tags.push(`en_${scope}_${identifier}`);
				}
			}
			if (locale) {
				tags.push(`${locale}_${scope}`);
			} else {
				tags.push(`it_${scope}`);
				tags.push(`en_${scope}`);
			}
			tags.push(scope);
			break;
	}

	// Always invalidate global content for any change
	if (scope !== 'global') {
		tags.push('global-content');
	}

	// Revalidate all relevant tags
	for (const tag of tags) {
		revalidateTag(tag);
	}

	console.log(
		`🔄 Cache invalidated for ${scope}${identifier ? `:${identifier}` : ''} - Tags: ${tags.join(', ')}`
	);
}

/**
 * Invalidate entire site cache (use sparingly)
 */
export function invalidateAllContent(): void {
	revalidateTag('global-content');
	revalidatePath('/', 'layout'); // This invalidates all pages
	console.log('🔄 Full site cache invalidated');
}

/**
 * Invalidate cache for live preview updates
 * More aggressive invalidation for immediate feedback
 */
export function invalidateForLivePreview(
	scope: CacheScope,
	identifier?: string,
	locale?: Locales
): void {
	// Use tag invalidation for efficiency
	invalidateContent(scope, identifier, locale);

	// Also invalidate specific paths for immediate effect
	if (scope === 'posts' && identifier) {
		revalidatePath(`/(frontend)/[locale]/blog/${identifier}`, 'page');
	}

	if (scope === 'global' && identifier) {
		if (identifier === 'home') {
			revalidatePath('/');
		} else {
			revalidatePath(`/(frontend)/[locale]/${identifier}`, 'page');
		}
	}

	console.log(
		`👁️ Live preview cache invalidated for ${scope}${identifier ? `:${identifier}` : ''}`
	);
}

/**
 * Warm up cache for critical content
 * Useful after deployments or major updates
 */
export function warmupCache(): void {
	// This could trigger background jobs to pre-populate cache
	// For now, just log the intent
	console.log(
		'🔥 Cache warmup requested - implement background jobs if needed'
	);
}
