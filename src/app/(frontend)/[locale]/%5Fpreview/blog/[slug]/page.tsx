import { draftMode } from 'next/headers';
import { setRequestLocale } from 'next-intl/server';
import { Suspense } from 'react';
import type { Locale, Locales } from '@/i18n/routing';
import { redirect } from '@/i18n/routing';
import { ArticleSkeleton } from '@/modules/components/skeletons/ArticleSkeleton';
import { BlogPostContent } from '@/modules/posts/BlogPostContent';

interface BlogPreviewPageProps {
	params: Promise<{ locale: string; slug: string }>;
}

export default function BlogPreviewPage({ params }: BlogPreviewPageProps) {
	return (
		<Suspense fallback={<ArticleSkeleton />}>
			<BlogPreviewContent params={params} />
		</Suspense>
	);
}

async function BlogPreviewContent({
	params,
}: {
	params: BlogPreviewPageProps['params'];
}) {
	const { locale, slug } = await params;
	setRequestLocale(locale);

	const { isEnabled } = await draftMode();

	if (!isEnabled) {
		redirect({ href: `/blog/${slug}`, locale: locale as Locale });
	}

	return <BlogPostContent draft locale={locale as Locales} slug={slug} />;
}
