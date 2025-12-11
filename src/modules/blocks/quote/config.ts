import {
	AlignFeature,
	BlockquoteFeature,
	BoldFeature,
	InlineToolbarFeature,
	ItalicFeature,
	LinkFeature,
	lexicalEditor,
	ParagraphFeature,
} from '@payloadcms/richtext-lexical';
import type { Block } from 'payload';
import { alignFields } from '../common';

export const QuoteBlock: Block = {
	slug: 'quote',
	interfaceName: 'QuoteBlock',
	fields: [
		{
			name: 'content',
			type: 'richText',
			localized: true,
			editor: lexicalEditor({
				features: () => [
					InlineToolbarFeature(),
					BoldFeature(),
					ItalicFeature(),
					AlignFeature(),
					BlockquoteFeature(),
					LinkFeature(),
					ParagraphFeature(),
				],
			}),
		},
		{
			name: 'author',
			type: 'text',
			label: 'Autore',
			localized: true,
		},
		...alignFields('bottom', 'right'),
	],
};
