import type { Image as ImageType, Post } from '@payload-types';
import { Link } from '@/i18n/routing';
import { CustomImage } from './CustomImage';

interface CardArticleProps {
	post: Post;
}

export default function CardArticle({ post }: CardArticleProps) {
	const author = post.author;
	const image = post.coverImage as ImageType;
	return (
		<Link
			href={`/blog/${post.slug}`}
			className='w-full h-full group items-center flex flex-nowrap flex-col gap-4 break-inside-avoid-column'
		>
			<CustomImage
				image={image}
				alt={image.caption || post.title}
				size='xlarge'
				className='w-full border h-full object-contain rounded-4xl border-white transition-all'
			/>
			<div className='px-2.5 w-full'>
				<p className='font-ghost uppercase text-white text-sm'>
					{typeof author === 'string' ? author : author.name}
				</p>
				<h2 className='group-hover:underline text-2xl uppercase text-white font-tagada underline-offset-4 decoration-1 transition-all'>
					{post.title}
				</h2>
			</div>
		</Link>
	);
}
