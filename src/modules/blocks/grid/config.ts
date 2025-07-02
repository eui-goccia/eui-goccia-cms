import type { Block } from 'payload';
import { ImageBlock } from '../image/config';
import { RichTextBlock } from '../richText/config';
import { TextBlock } from '../text/config';

export const GridBlock: Block = {
	slug: 'grid',
	interfaceName: 'GridBlock',
	fields: [
		{
			name: 'items',
			label: 'Items',
			admin: {
				description:
					'Add up to 4 items, they will be displayed in a single row',
			},
			type: 'blocks',
			blocks: [ImageBlock, TextBlock, RichTextBlock],
			minRows: 1,
			maxRows: 4,
		},
	],
};
