import type { Author, Image, Post } from '@payload-types';
import { notFound } from 'next/navigation';
import type { Locales } from '@/i18n/routing';
import { BlockRenderer } from '@/modules/blocks/BlockRenderer';
import HeaderArticle from '@/modules/components/HeaderArticle';
import { getDocument } from '@/modules/utilities/getDocument';

export async function BlogPostContent({
	draft = false,
	locale,
	slug,
}: {
	draft?: boolean;
	locale: Locales;
	slug: string;
}) {
	const post = (await getDocument({
		collection: 'posts',
		slug,
		depth: 2,
		draft,
		locale,
	})) as Post;

	if (!post) {
		notFound();
	}
	const author = post.author as Author;
	const cover = post.coverImage as Image;

	return (
		<>
			<HeaderArticle
				author={author}
				coverImage={cover}
				publishedAt={post.publishedAt}
				title={post.title}
			/>
			<div className='px-5 lg:px-10 pb-30 grid grid-cols-12 gap-5 bg-blu-300'>
				<div className='col-start-1 2xl:col-start-2 hidden lg:inline sticky lg:top-34 xl:top-50 h-fit col-span-4 2xl:col-span-3' />

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
