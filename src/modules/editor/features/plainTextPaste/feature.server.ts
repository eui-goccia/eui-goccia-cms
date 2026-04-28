import { createServerFeature } from '@payloadcms/richtext-lexical';

export const PlainTextPasteFeature = createServerFeature({
	feature: {
		ClientFeature:
			'@/modules/editor/features/plainTextPaste/feature.client#PlainTextPasteFeatureClient',
	},
	key: 'plainTextPaste',
});
