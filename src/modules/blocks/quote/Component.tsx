import type { QuoteBlock } from '@payload-types';
import type React from 'react';
import { getAlignmentClasses } from '@/modules/blocks/common/getAlignmentClasses';
import RichTextEditor from '@/modules/editor/component';
import { cn } from '@/modules/utilities/cnUtils';

export const QuoteBlockComponent: React.FC<{ blockData: QuoteBlock }> = ({
	blockData,
}) => {
	const { content, vertical, horizontal, author } = blockData;

	const alignmentClass = getAlignmentClasses({ vertical, horizontal });

	if (!content) {
		return null;
	}

	return (
		<blockquote
			className={cn(alignmentClass, 'h-full w-full flex flex-col gap-2')}
		>
			<RichTextEditor data={content} enableGutter={false} enableProse={true} />
			{author ? <p className='text-sm'>{author}</p> : null}
		</blockquote>
	);
};
