import type { Post } from '@payload-types';
import { setRequestLocale } from 'next-intl/server';
import type { PaginatedDocs } from 'payload';
import localization from '@/i18n/localization';
import type { Locales } from '@/i18n/routing';
import { BlogPostContent } from '@/modules/posts/BlogPostContent';
import { getDocuments } from '@/modules/utilities/getDocument';

interface PageProps {
	params: Promise<{ slug: string; locale: string }>;
}

export async function generateStaticParams() {
	const slugSet = new Set<string>();

	const results = await Promise.allSettled(
		localization.locales.map((localeConfig) =>
			getDocuments({
				collection: 'posts',
				depth: 0,
				limit: 20,
				draft: false,
				locale: localeConfig.code as Locales,
			})
		)
	);

	for (const [i, result] of results.entries()) {
		const localeCode = localization.locales[i].code;
		if (result.status === 'rejected') {
			console.error(
				`[generateStaticParams] Failed to fetch posts for locale "${localeCode}":`,
				result.reason
			);
			continue;
		}
		const posts = result.value as PaginatedDocs<Post>;
		for (const { slug } of posts.docs) {
			if (slug && typeof slug === 'string') {
				slugSet.add(slug);
			}
		}
	}

	const slugs = Array.from(slugSet).map((slug) => ({ slug }));

	return slugs.length > 0 ? slugs : [{ slug: '_placeholder' }];
}

export default async function BlogPost({ params }: PageProps) {
	const { slug, locale } = await params;
	setRequestLocale(locale);

	return (
		<BlogPostContent draft={false} locale={locale as Locales} slug={slug} />
	);
}
