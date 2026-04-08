import type { Home, Image } from '@payload-types';
import { CustomImage } from '../CustomImage';
import GocciaIntro from '../logos/GocciaIntro';

export default function SectionHero({ home }: { home: Home }) {
	const hero_image = home.hero_image as Image;

	return (
		<hgroup className='relative h-dvh overflow-clip'>
			<div className='absolute inset-0 z-0'>
				<CustomImage
					className='object-cover'
					image={hero_image}
					loading='eager'
					priority={true}
					quality={75}
					size='xlarge'
				/>
			</div>

			<div className='relative z-10 flex h-full items-center justify-center pointer-events-none'>
				<GocciaIntro className='sticky top-1/2 px-10 -translate-y-1/2' />
			</div>
		</hgroup>
	);
}
