import type { Author, Image } from '@payload-types';
import { CustomImage } from './CustomImage';

interface HeaderProps {
	title: string;
	coverImage: Image;
	author: string | Author;
	publishedAt: string;
}

export default function HeaderArticle({
	title,
	coverImage,
	author,
	publishedAt,
}: HeaderProps) {
	return (
		<div className='flex items-center flex-col bg-blu-300'>
			<hgroup className='pt-30 md:pt-50 pb-20 max-w-[1300px] md:pb-40 flex flex-col gap-14  items-center justify-center w-full'>
				<h1 className='uppercase text-pretty col-start-1 z-10 lg:col-start-2 col-span-full lg:col-span-10 md:text-4xl text-3xl lg:text-5xl xl:text-6xl font-tagada px-5 md:px-10'>
					{title}
				</h1>
				<ul className='flex md:flex-row flex-col md:justify-between font-greed uppercase text-xl varW600 w-full px-5 md:px-10'>
					<li>{typeof author === 'string' ? author : author.name}</li>
					<li>
						{new Date(publishedAt).toLocaleDateString('it-IT', {
							day: 'numeric',
							month: 'long',
							year: 'numeric',
						})}
					</li>
				</ul>
			</hgroup>

			<CustomImage
				image={coverImage}
				className='w-full aspect-3/2 object-cover object-center rounded-4xl'
				alt={coverImage.alt || coverImage.caption || ''}
				size='xlarge'
				showCaption={true}
				captionClassName='w-full pt-2.5 px-5 flex items-start'
			/>
		</div>
	);
}
