import type { Image as ImageType } from '@payload-types';
import { CustomImage } from './CustomImage';

type CellVisualProps = {
	srcImage: ImageType | null;
	altContent?: string | null;
	credits?: string | null;
};

export default function CellVisual({
	srcImage,
	altContent,
	credits,
}: CellVisualProps) {
	return (
		<div className='aspect-3/2 relative bg-amber-300/30 w-full h-full rounded-2xl'>
			{srcImage && (
				<CustomImage
					alt={altContent || ''}
					className='w-full h-full rounded-2xl object-cover'
					image={srcImage}
					size='large'
				/>
			)}
			{credits && <p className='absolute z-10 bottom-2 left-2'>{credits}</p>}
		</div>
	);
}
