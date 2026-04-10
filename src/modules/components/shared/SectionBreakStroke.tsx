import mask from '@public/images/meta/BreakStroke.webp';

export default function SectionBreakFill() {
	return (
		<div className='h-55 relative col-span-full w-full bg-rosso-500'>
			{/* biome-ignore lint/performance/noImgElement: Decorative static assets should bypass next/image and load from _next/static/media directly. */}
			<img
				alt=''
				aria-hidden='true'
				className='absolute h-full w-full inset-0 object-center object-cover'
				decoding='async'
				height={mask.height}
				loading='lazy'
				src={mask.src}
				width={mask.width}
			/>
		</div>
	);
}
