import type { TextBlock } from '@payload-types';
import type React from 'react';
import { getAlignmentClasses } from '@/modules/blocks/common/getAlignmentClasses';
import { cn } from '@/modules/utilities/cnUtils';

export const TextBlockComponent: React.FC<{
	blockData: TextBlock;
	className?: string;
}> = ({ blockData, className }) => {
	const { content, vertical, horizontal } = blockData;

	const alignmentClass = getAlignmentClasses({ vertical, horizontal });

	return (
		<div className={cn(alignmentClass, 'h-full w-full', className)}>
			<p className='font-greed tracking-[0.01em] text-xl md:text-2xl'>
				{content}
			</p>
		</div>
	);
};
