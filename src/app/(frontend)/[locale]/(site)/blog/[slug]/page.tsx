import type { Post } from '@payload-types';
import { setRequestLocale } from 'next-intl/server';
import type { PaginatedDocs } from 'payload';
import type { Locales } from '@/i18n/routing';
import { BlogPostContent } from '@/modules/posts/BlogPostContent';
import { getDocuments } from '@/modules/utilities/getDocument';

interface PageProps {
	params: Promise<{ slug: string; locale: string }>;
}

export async function generateStaticParams({
	params,
}: {
	params: { locale: string };
}) {
	try {
		const posts = (await getDocuments({
			collection: 'posts',
			depth: 0,
			limit: 20,
			draft: false,
			locale: params.locale as Locales,
		})) as PaginatedDocs<Post>;

		const slugs = posts.docs.flatMap(({ slug }) =>
			slug && typeof slug === 'string' ? [{ slug }] : []
		);

		return slugs.length > 0 ? slugs : [{ slug: '_placeholder' }];
	} catch (error) {
		console.error(
			`[generateStaticParams] Failed to fetch posts for locale "${params.locale}":`,
			error
		);
		return [{ slug: '_placeholder' }];
	}
}

export default async function BlogPost({ params }: PageProps) {
	const { slug, locale } = await params;
	setRequestLocale(locale);

	return (
		<BlogPostContent draft={false} locale={locale as Locales} slug={slug} />
	);
}
