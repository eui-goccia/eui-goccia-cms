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
					image={hero_title}
					className='object-contain absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:px-10 px-5 xl:px-20 w-full h-auto z-10 max-w-[95vw]'
					priority={true}
					loading='eager'
					size='xlarge'
					alt={hero_title.alt}
				/>

				<CustomImage
					image={hero_texture}
					className='object-cover absolute inset-0 z-10 w-full h-full'
					priority={true}
					loading='eager'
					size='xlarge'
					alt={hero_texture.alt}
				/>

				<CustomImage
					image={hero_image}
					className='object-cover'
					priority={true}
					loading='eager'
					size='xlarge'
					quality={75}
					alt={hero_image.alt}
				/>
			</div>
		</hgroup>
	);
}
