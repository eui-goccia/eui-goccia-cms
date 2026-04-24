import { draftMode } from 'next/headers';
import type { PaginatedDocs } from 'payload';
import { Suspense } from 'react';
import type { Locales } from '@/i18n/routing';
import CardArticle from '@/modules/components/CardArticle';
import type { Post } from '@/modules/payload/payload-types';
import { getDocuments } from '@/modules/utilities/getDocument';

interface BlogProps {
	params: Promise<{ locale: string }>;
}

function BlogGridSkeleton() {
	return (
		<div className='pb-28 pt-24 lg:pb-32'>
			<div className='columns-1 gap-5 space-y-4 md:columns-2 lg:columns-3'>
				{Array.from({ length: 6 }).map((_, index) => (
					<div
						className='mb-4 h-80 animate-pulse rounded-[28px] bg-black/8'
						// biome-ignore lint/suspicious/noArrayIndexKey: static fallback list
						key={index}
					/>
				))}
			</div>
		</div>
	);
}

async function BlogGrid({ locale }: { locale: Locales }) {
	const { isEnabled: draft } = await draftMode();
	const posts = (await getDocuments({
		collection: 'posts',
		depth: 2,
		draft,
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

export default async function Blog({ params }: BlogProps) {
	const { locale } = await params;

	return (
		<main className='mb-auto px-10 bg-blu-300'>
			<Suspense fallback={<BlogGridSkeleton />}>
				<BlogGrid locale={locale as Locales} />
			</Suspense>
		</main>
	);
}
