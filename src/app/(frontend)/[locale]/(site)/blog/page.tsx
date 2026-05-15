import { setRequestLocale } from 'next-intl/server';
import type { PaginatedDocs } from 'payload';
import type { Locales } from '@/i18n/routing';
import CardArticle from '@/modules/components/CardArticle';
import type { Post } from '@/modules/payload/payload-types';
import { getDocuments } from '@/modules/utilities/getDocument';

async function BlogGrid({ locale }: { locale: Locales }) {
	const posts = (await getDocuments({
		collection: 'posts',
		depth: 2,
		draft: false,
		limit: 0,
		locale: locale as Locales,
		sort: '-publishedAt',
	})) as PaginatedDocs<Post>;

	return (
		<div className='pb-28 lg:pb-32 pt-24 gap-5 lg:columns-3 md:columns-2 columns-1 space-y-4 break-inside-avoid-column [&>*]:content-visibility-auto [&>*]:contain-intrinsic-size-[auto_400px]'>
			{posts.docs.map((post) => (
				<CardArticle key={post.id} post={post} />
			))}
		</div>
	);
}

export default async function Blog({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	setRequestLocale(locale);

	return (
		<main className='mb-auto px-10 bg-blu-300'>
			<BlogGrid locale={locale as Locales} />
		</main>
	);
}
