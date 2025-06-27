import {
	AlignFeature,
	BoldFeature,
	HeadingFeature,
	HorizontalRuleFeature,
	IndentFeature,
	InlineToolbarFeature,
	ItalicFeature,
	LinkFeature,
	lexicalEditor,
	ParagraphFeature,
	StrikethroughFeature,
	UnderlineFeature,
} from '@payloadcms/richtext-lexical';

export const defaultLexical = lexicalEditor({
	features: [
		InlineToolbarFeature(),
		BoldFeature(),
		ItalicFeature(),
		UnderlineFeature(),
		StrikethroughFeature(),
		AlignFeature(),
		IndentFeature(),
		HorizontalRuleFeature(),
		HeadingFeature({
			enabledHeadingSizes: ['h3', 'h4', 'h5', 'h6'],
		}),
		ParagraphFeature(),
		LinkFeature(),
	],
});

export const minimalLexical = lexicalEditor({
	features: [
		InlineToolbarFeature(),
		BoldFeature(),
		ItalicFeature(),
		UnderlineFeature(),
		StrikethroughFeature(),
		AlignFeature(),
		ParagraphFeature(),
		HorizontalRuleFeature(),
		LinkFeature(),
	],
});
