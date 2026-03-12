import type { Image as ImageType, Post, Tag } from '@payload-types';
import { getLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { CustomImage } from './CustomImage';

interface EventCardProps {
	post: Post;
	showImage?: boolean;
}

function formatEventDate(timestamp: string, locale: string): string {
	const date = new Date(timestamp);
	return date.toLocaleDateString(locale === 'it' ? 'it-IT' : 'en-GB', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	});
}

export default async function EventCard({
	post,
	showImage = true,
}: EventCardProps) {
	const locale = await getLocale();
	const image = post.coverImage as ImageType;
	const tags = post.tags as Tag[] | undefined;
	const firstTag = tags?.[0];

	return (
		<Link
			className='group flex flex-col gap-3'
			href={`/blog/${post.slug}`}
			locale={locale}
		>
			{showImage && image ? (
				<div className='aspect-[4/3] overflow-hidden rounded-[30px]'>
					<CustomImage
						alt={image.caption || post.title}
						className='object-cover rounded-[30px] transition-transform duration-500 group-hover:scale-105'
						image={image}
						size='large'
					/>
				</div>
			) : null}

			<div className='flex items-center justify-between gap-2'>
				<p className='font-greed text-lg font-bold uppercase tracking-wider underline decoration-rosso-500 decoration-2 underline-offset-4'>
					{post.publishedAt ? formatEventDate(post.publishedAt, locale) : '—'}
				</p>
				{firstTag ? (
					<p className='font-greed text-lg font-bold uppercase tracking-wider text-right underline decoration-rosso-500 decoration-2 underline-offset-4'>
						{firstTag.name}
					</p>
				) : null}
			</div>

			<h3 className='font-tagada text-3xl leading-tight tracking-wide lg:text-4xl'>
				{post.title}
			</h3>

			{post.description ? (
				<p className='font-greed text-xl leading-snug tracking-wide text-black/80 lg:text-2xl'>
					{post.description}
				</p>
			) : null}

			<p className='font-greed text-lg font-bold uppercase tracking-wider underline underline-offset-4 transition-colors group-hover:text-rosso-500'>
				SCOPRI DI PIÙ
			</p>
		</Link>
	);
}
