import type { Home, Image } from '@payload-types';
import { CustomImage } from '../CustomImage';

export default function SectionHero({ home }: { home: Home }) {
	const hero_image = home.hero_image as Image;

	return (
		<hgroup>
			<div className='h-dvh w-full grid place-items-center relative'>
				<h1 className='font-ghost text-blu-500 text-9xl sticky top-10'>
					GOCCIA
				</h1>

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
