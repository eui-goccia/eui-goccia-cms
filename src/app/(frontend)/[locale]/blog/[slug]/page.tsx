import type { Author, Image, Post } from '@payload-types';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import type { PaginatedDocs } from 'payload';
import localization from '@/i18n/localization';
import type { Locales } from '@/i18n/routing';
import { BlockRenderer } from '@/modules/blocks/BlockRenderer';
import HeaderArticle from '@/modules/components/HeaderArticle';
import {
	getCachedDocument,
	getCachedDocuments,
} from '@/modules/utilities/getDocument';

interface PageProps {
	params: Promise<{ slug: string; locale: string }>;
}

export async function generateStaticParams() {
	// Generate static params for all unique slugs across locales
	const slugSet = new Set<string>();

	for (const localeConfig of localization.locales) {
		const locale = localeConfig.code as Locales;

		try {
			const posts = (await getCachedDocuments({
				collection: 'posts',
				depth: 0, // We only need the slug, reduce depth for performance
				limit: 100,
				draft: false,
				locale,
			})) as PaginatedDocs<Post>;

			// Add unique slugs to set
			posts.docs.forEach(({ slug }) => {
				if (slug && typeof slug === 'string') {
					slugSet.add(slug);
				}
			});
		} catch (error) {
			console.warn(
				`Failed to generate static params for locale ${locale}:`,
				error
			);
		}
	}

	return Array.from(slugSet).map((slug) => ({ slug }));
}

export default async function BlogPost({ params }: PageProps) {
	const { slug, locale } = await params;
	const { isEnabled: draft } = await draftMode();

	const post = (await getCachedDocument({
		collection: 'posts',
		slug,
		depth: 2,
		draft,
		locale: locale as Locales,
	})) as Post;

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
