import type { Author, Image as ImageType, Post } from '@payload-types';
import Link from 'next/link';
import { CustomImage } from './CustomImage';

interface CardArticleProps {
	data: Post;
}

export default function CardArticle({ data }: CardArticleProps) {
	const author = data.author as Author;
	const image = data.coverImage as ImageType;
	return (
		<Link
			href={`/blog/${data.slug}`}
			className='w-full h-full group items-center flex flex-nowrap flex-col gap-4 break-inside-avoid-column'
		>
			<CustomImage
				image={image}
				alt={image.caption || data.title}
				size='large'
				className='w-full border h-fulll rounded-4xl border-white transition-all'
			/>
			<div className='px-2.5 w-full'>
				<p className='font-ghost uppercase text-white text-sm'>
					{author?.name || 'Redazione'}
				</p>
				<h2 className='group-hover:underline text-2xl uppercase text-white font-tagada underline-offset-4 decoration-1 transition-all'>
					{data.title}
				</h2>
			</div>
		</Link>
	);
}
