import type { Author, Image, Post } from '@payload-types';
import { notFound } from 'next/navigation';
import { BlockRenderer } from '@/modules/blocks/BlockRenderer';
import HeaderArticle from '@/modules/components/HeaderArticle';
import { getCachedDocument } from '@/modules/utilities/getDocument';

interface PageProps {
	params: Promise<{ slug: string }>;
}

export default async function BlogPost({ params }: PageProps) {
	const { slug } = await params;
	const post = (await getCachedDocument('posts', slug, 2)) as Post;

	if (!post) {
		notFound();
	}
	const author = post.author as Author;
	const cover = post.coverImage as Image;

	return (
		<>
			<HeaderArticle
				title={post.title}
				coverImage={cover}
				author={author}
				publishedAt={post.publishedAt || ''}
			/>
			<div className='px-5 lg:px-10 pb-30 grid grid-cols-12 gap-5 bg-blu-300'>
				{/* spacer */}
				<div className='col-start-1 2xl:col-start-2 hidden lg:inline sticky lg:top-34 xl:top-50 h-fit col-span-4 2xl:col-span-3'></div>

				{/* article content */}
				<article className='col-start-1 flex lg:col-start-5 col-span-full lg:col-span-8 xl:col-span-7 flex-col gap-10 md:gap-20 lg:gap-24 pt-28 lg:pt-32 xl:pt-48 items-center text-3xl justify-center'>
					{post.content.map((block) => (
						<BlockRenderer block={block} key={block.id} />
					))}

					<p className='w-full text-right italic text-balance font-greed varW600 text-2xl'>
						{author.name}. {author.bio || ''}
					</p>
				</article>
			</div>
		</>
	);
}
