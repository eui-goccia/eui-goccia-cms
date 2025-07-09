import { draftMode } from 'next/headers';
import { getLocale } from 'next-intl/server';
import type { PaginatedDocs } from 'payload';
import type { Locales } from '@/i18n/routing';
import CardArticle from '@/modules/components/CardArticle';
import type { Post } from '@/modules/payload/payload-types';
import { getCachedDocuments } from '@/modules/utilities/getDocument';

export const dynamic = 'force-static';
export const revalidate = 600;

export default async function Blog() {
	const locale: Locales = (await getLocale()) as Locales;
	const { isEnabled: draft } = await draftMode();
	const posts = (await getCachedDocuments({
		collection: 'posts',
		depth: 2,
		draft,
		locale,
	})) as PaginatedDocs<Post>;

	return (
		<main className='mb-auto px-10 bg-blue-500'>
			<div className='pb-28 lg:pb-32 pt-24 gap-5 lg:columns-3 md:columns-2 columns-1 space-y-4 break-inside-avoid-column'>
				{posts.docs.map((post) => (
					<CardArticle post={post} key={post.id} />
				))}
			</div>
		</main>
	);
}
