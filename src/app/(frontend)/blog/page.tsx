import type { PaginatedDocs } from 'payload';
import CardArticle from '@/modules/components/CardArticle';
import type { Post } from '@/modules/payload/payload-types';
import { getCachedDocuments } from '@/modules/utilities/getDocument';

export default async function Blog() {
	const posts = (await getCachedDocuments('posts', 2)) as PaginatedDocs<Post>;

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
