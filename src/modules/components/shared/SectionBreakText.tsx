import mask from '@public/images/meta/BreakText.webp';
import Image from 'next/image';

interface SectionProps {
	text: string;
}

export default function SectionBreakText({ text }: SectionProps) {
	return (
		<div className='h-dvh relative col-span-full w-full bg-rosso-500 grid grid-cols-12 lg:px-10 px-5 items-center'>
			<h2 className='uppercase text-pretty col-start-1 z-10 lg:col-start-2 col-span-full lg:col-span-10 md:text-4xl text-3xl lg:text-5xl xl:text-6xl font-tagada text-center max-w-prose'>
				{text}
			</h2>
			<Image
				className='absolute h-full w-full z-0 inset-0 object-center object-cover'
				src={mask}
				sizes='100vw'
				quality={90}
				fill={true}
				alt=''
			/>
		</div>
	);
}
