import type { ImageBlock } from '@payload-types';
import type React from 'react';
import { CustomImage } from '@/modules/components/CustomImage';
import { cn } from '@/modules/utilities/cnUtils';

export const ImageBlockComponent: React.FC<{
	blockData: ImageBlock;
	className?: string;
}> = ({ blockData, className }) => {
	const { image } = blockData;

	if (!image || typeof image !== 'object') {
		return null;
	}

	return (
		<CustomImage
			alt={image.alt || image.caption || ''}
			className={cn('rounded-4xl aspect-16/10 object-cover', className)}
			image={image}
			size='xlarge'
		/>
	);
};
