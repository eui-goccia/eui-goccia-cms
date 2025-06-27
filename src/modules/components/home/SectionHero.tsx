import Image from 'next/image';
import heroTexture from '@/assets/images/homepage/heroTexture.webp';
import heroTitle from '@/assets/images/homepage/heroTitle.webp';
import heroImage from '@/assets/images/homepage/home_1.webp';

export default function SectionHero() {
	return (
		<hgroup>
			<h1 className='sr-only'>Homepage</h1>
			<div className='h-dvh w-full relative'>
				<Image
					src={heroTitle}
					className='object-cover absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:px-10 px-5 xl:px-20 w-full h-auto z-10'
					priority={true}
					sizes='95vw'
					quality={90}
					alt=''
				/>

				<Image
					src={heroTexture}
					className='object-cover absolute inset-0 z-10 w-full h-full'
					priority={true}
					sizes='100vw'
					quality={90}
					alt=''
				/>

				<Image
					src={heroImage}
					className='object-cover'
					fill={true}
					priority={true}
					sizes='100vw'
					quality={75}
					alt=''
				/>
			</div>
		</hgroup>
	);
}
