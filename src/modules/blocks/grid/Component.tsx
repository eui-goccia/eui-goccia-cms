import type { GridBlock } from '@payload-types';
import type React from 'react';
import { Fragment } from 'react';
import { BlockRenderer } from '@/modules/blocks/BlockRenderer';
import { cn } from '@/modules/utilities/cnUtils';

export const GridBlockComponent: React.FC<{
	blockData: GridBlock;
	className?: string;
}> = ({ blockData, className }) => {
	const { items } = blockData;

	if (!items || items.length === 0) {
		return null;
	}

	const gridColsClass = `grid-cols-${items.length > 4 ? 4 : items.length}`; // Max 4 columns
	return (
		<div
			className={cn('grid w-full grid-cols-3 gap-4', gridColsClass, className)}
		>
			{items.map((item) => (
				<Fragment key={item.id}>
					{item.blockType === 'image' ? (
						<div className='col-span-1 h-full w-full'>
							<BlockRenderer
								block={item}
								className={cn(items.length > 1 && 'aspect-4/5 object-cover')}
							/>
						</div>
					) : (
						<div className='col-span-1 h-full w-full'>
							<BlockRenderer block={item} />
						</div>
					)}
				</Fragment>
			))}
		</div>
	);
};
