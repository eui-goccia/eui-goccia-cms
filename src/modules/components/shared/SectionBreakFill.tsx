import mask from '@public/images/meta/BreakFill.webp';
import Image from 'next/image';

export default function SectionBreakFill() {
	return (
		<div className='h-dvh max-h-[900px] relative  col-span-full w-full bg-blu-500'>
			<Image
				className='absolute h-full w-full object-center inset-0 object-cover'
				src={mask}
				sizes='100vw'
				quality={90}
				fill={true}
				alt=''
			/>
		</div>
	);
}
