import mask from '@public/images/meta/BreakStroke.webp';
import Image from 'next/image';

export default function SectionBreakFill() {
	return (
		<div className='h-dvh max-h-[900px] relative col-span-full w-full bg-rosso-500'>
			<Image
				alt=''
				className='absolute h-full w-full inset-0 object-center object-cover'
				fill={true}
				quality={90}
				sizes='100vw'
				src={mask}
			/>
		</div>
	);
}
