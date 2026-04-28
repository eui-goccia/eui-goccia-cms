import {
	BoldFeature,
	HeadingFeature,
	HorizontalRuleFeature,
	IndentFeature,
	InlineToolbarFeature,
	ItalicFeature,
	LinkFeature,
	lexicalEditor,
	ParagraphFeature,
	UnderlineFeature,
	UploadFeature,
} from '@payloadcms/richtext-lexical';
import { PlainTextPasteFeature } from './features/plainTextPaste/feature.server';

export const defaultLexical = lexicalEditor({
	features: [
		PlainTextPasteFeature(),
		InlineToolbarFeature(),
		BoldFeature(),
		ItalicFeature(),
		UnderlineFeature(),
		UploadFeature(),
		IndentFeature(),
		HorizontalRuleFeature(),
		HeadingFeature({
			enabledHeadingSizes: ['h2', 'h3', 'h4', 'h5', 'h6'],
		}),
		ParagraphFeature(),
		LinkFeature(),
	],
});

export const minimalLexical = lexicalEditor({
	features: [
		PlainTextPasteFeature(),
		InlineToolbarFeature(),
		BoldFeature(),
		ItalicFeature(),
		UnderlineFeature(),
		ParagraphFeature(),
		HorizontalRuleFeature(),
		LinkFeature(),
	],
});
