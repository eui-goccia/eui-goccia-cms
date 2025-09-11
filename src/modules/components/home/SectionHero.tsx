import type { Home, Image } from '@payload-types';
import { CustomImage } from '../CustomImage';

export default function SectionHero({ home }: { home: Home }) {
	const hero_title = home.hero_title as Image;
	const hero_texture = home.hero_texture as Image;
	const hero_image = home.hero_image as Image;

	return (
		<hgroup>
			<h1 className='sr-only'>Homepage</h1>
			<div className='h-dvh w-full relative'>
				<CustomImage
					className='object-contain absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:px-10 px-5 xl:px-20 w-full h-auto z-10 max-w-[95vw]'
					image={hero_title}
					loading='eager'
					priority={true}
					size='xlarge'
				/>

				<CustomImage
					className='object-cover absolute inset-0 z-10 w-full h-full'
					image={hero_texture}
					loading='eager'
					priority={true}
					size='xlarge'
				/>

				<CustomImage
					className='object-cover'
					image={hero_image}
					loading='eager'
					priority={true}
					quality={75}
					size='xlarge'
				/>
			</div>
		</hgroup>
	);
}
