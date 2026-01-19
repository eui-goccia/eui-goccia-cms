import type { Block } from 'payload';
import { GridBlock } from './grid/config';
import { ImageBlock } from './image/config';
import { QuoteBlock } from './quote/config';
import { RichTextBlock } from './richText/config';
import { TextBlock } from './text/config';
import { VideoBlock } from './video/config';

export const defaultBlocks: Block[] = [
	TextBlock,
	RichTextBlock,
	QuoteBlock,
	ImageBlock,
	VideoBlock,
	GridBlock,
];
