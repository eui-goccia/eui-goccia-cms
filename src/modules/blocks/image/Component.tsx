import type { ImageBlock } from '@payload-types';
import type React from 'react';
import { CustomImage } from '@/modules/components/CustomImage';
import { cn } from '@/modules/utilities/cnUtils';

export const ImageBlockComponent: React.FC<{
	blockData: ImageBlock;
	className?: string;
}> = ({ blockData, className }) => {
	const { image, id } = blockData;

	if (!image || typeof image !== 'object') {
		console.warn(`ImageBlock (${id || 'unknown'}) missing image resource.`);
		return null;
	}

	return (
		<CustomImage
			image={image}
			size='xlarge'
			alt={image.alt || image.caption || ''}
			className={cn('rounded-2xl aspect-16/9 object-cover', className)}
		/>
	);
};
