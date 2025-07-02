import type { RichTextBlock } from '@payload-types';
import type React from 'react';
import { getAlignmentClasses } from '@/modules/blocks/common/getAlignmentClasses';
import RichTextEditor from '@/modules/editor/component';
import { cn } from '@/modules/utilities/cnUtils';

export const RichTextBlockComponent: React.FC<{
	blockData: RichTextBlock;
	className?: string;
}> = ({ blockData, className }) => {
	const { content, vertical, horizontal } = blockData;

	const alignmentClass = getAlignmentClasses({ vertical, horizontal });

	if (!content) {
		return null;
	}

	return (
		<div className={cn(alignmentClass, 'h-full w-full', className)}>
			<RichTextEditor data={content} enableProse={true} enableGutter={false} />
		</div>
	);
};
