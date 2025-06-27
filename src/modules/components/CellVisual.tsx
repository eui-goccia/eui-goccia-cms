import type { StaticImageData } from 'next/image';
import Image from 'next/image';

interface CellVisualProps {
	srcImage: StaticImageData;
	altContent?: string;
	credits?: string;
}

export default function CellVisual({
	srcImage,
	altContent,
	credits,
}: CellVisualProps) {
	return (
		<div className='aspect-3/2 relative bg-amber-300/30 w-full h-full rounded-2xl'>
			<Image
				className='w-full h-full rounded-2xl  object-cover'
				src={srcImage}
				fill={true}
				alt={altContent || ''}
				sizes='50vw'
				quality={75}
			/>
			<p className='absolute z-10 bottom-2  left-2'>{credits}</p>
		</div>
	);
}
