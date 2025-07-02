import type { Block } from 'payload';
import { alignFields } from '../common';

export const RichTextBlock: Block = {
	slug: 'richText',
	interfaceName: 'RichTextBlock',
	fields: [
		{
			name: 'content',
			type: 'richText',
		},
		...alignFields(),
	],
};
