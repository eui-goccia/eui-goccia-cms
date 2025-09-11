import type {
	GridBlock,
	ImageBlock,
	QuoteBlock,
	RichTextBlock,
	TextBlock,
} from '@payload-types';
import type React from 'react';
import { GridBlockComponent } from './grid/Component';
import { ImageBlockComponent } from './image/Component';
import { QuoteBlockComponent } from './quote/Component';
import { RichTextBlockComponent } from './richText/Component';
import { TextBlockComponent } from './text/Component';

type Block = TextBlock | RichTextBlock | QuoteBlock | ImageBlock | GridBlock;

const blockComponents = {
	text: TextBlockComponent,
	richText: RichTextBlockComponent,
	quote: QuoteBlockComponent,
	image: ImageBlockComponent,
	grid: GridBlockComponent,
};

type BlockRendererProps = {
	block: Block;
	className?: string;
};

export const BlockRenderer: React.FC<BlockRendererProps> = ({
	block,
	className,
}) => {
	const { blockType } = block;

	const Component = blockComponents[blockType as keyof typeof blockComponents];

	if (Component) {
		const TypedComponent = Component as React.FC<{
			blockData: Block;
			className?: string;
		}>;
		return <TypedComponent blockData={block} className={className} />;
	}
	console.warn(
		`BlockRenderer: No component found for blockType "${blockType}"`
	);
	return null;
};
