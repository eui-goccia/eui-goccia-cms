import { draftMode } from 'next/headers';
import type { PaginatedDocs } from 'payload';
import type { Locales } from '@/i18n/routing';
import CardArticle from '@/modules/components/CardArticle';
import type { Post } from '@/modules/payload/payload-types';
import { getDocuments } from '@/modules/utilities/getDocument';

interface BlogProps {
	params: Promise<{ locale: string }>;
}

export default async function Blog({ params }: BlogProps) {
	const { locale } = await params;
	const { isEnabled: draft } = await draftMode();

	const posts = (await getDocuments({
		collection: 'posts',
		depth: 2,
		draft,
		locale: locale as Locales,
		sort: '-publishedAt',
	})) as PaginatedDocs<Post>;

	return (
		<main className='mb-auto px-10 bg-blue-500'>
			<div className='pb-28 lg:pb-32 pt-24 gap-5 lg:columns-3 md:columns-2 columns-1 space-y-4 break-inside-avoid-column'>
				{posts.docs.map((post) => (
					<CardArticle key={post.id} post={post} />
				))}
			</div>
		</main>
	);
}
