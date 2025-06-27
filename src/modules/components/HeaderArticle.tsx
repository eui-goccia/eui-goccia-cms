import Image, { type StaticImageData } from 'next/image';

interface HeaderProps {
	title: string;
	coverImage: StaticImageData;
	author: string;
	publishedAt: string;
	captionCover: string;
}

export default function HeaderArticle({
	title,
	coverImage,
	author,
	publishedAt,
	captionCover,
}: HeaderProps) {
	return (
		<div className='flex items-center flex-col bg-blu-300'>
			<hgroup className='pt-30 md:pt-50  pb-20 max-w-[1300px] md:pb-40 flex flex-col gap-14  items-center justify-center w-full'>
				<h1 className='uppercase text-pretty col-start-1 z-10 lg:col-start-2 col-span-full lg:col-span-10 md:text-4xl text-3xl lg:text-5xl xl:text-6xl font-tagada px-5 md:px-10'>
					{title}
				</h1>
				<ul className='flex md:flex-row flex-col md:justify-between font-greed uppercase text-xl varW600 w-full px-5 md:px-10'>
					<li>{author}</li>
					<li>{publishedAt}</li>
				</ul>
			</hgroup>

			<Image
				src={coverImage}
				className='w-full rounded-4xl aspect-3/2 object-cover object-center'
				quality={80}
				priority={true}
				sizes='100vw'
				alt=''
				width={100}
				height={100}
			/>

			<div className='w-full pt-2.5 px-5 flex items-start'>
				<p className='font-greed text-lg'>{captionCover}</p>
			</div>
		</div>
	);
}
