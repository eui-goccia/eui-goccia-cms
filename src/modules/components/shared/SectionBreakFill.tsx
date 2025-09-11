import mask from '@public/images/meta/BreakFill.webp';
import Image from 'next/image';

export default function SectionBreakFill() {
	return (
		<div className='h-dvh max-h-[900px] relative  col-span-full w-full bg-blu-500'>
			<Image
				alt=''
				className='absolute h-full w-full object-center inset-0 object-cover'
				fill={true}
				quality={90}
				sizes='100vw'
				src={mask}
			/>
		</div>
	);
}
