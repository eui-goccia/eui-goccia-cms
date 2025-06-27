import {
	MetaDescriptionField,
	MetaImageField,
	MetaTitleField,
	OverviewField,
	PreviewField,
} from '@payloadcms/plugin-seo/fields';
import type { Tab } from 'payload';

export const seoTab: Tab = {
	name: 'meta',
	label: 'SEO',
	fields: [
		OverviewField({
			titlePath: 'meta.title',
			descriptionPath: 'meta.description',
			imagePath: 'meta.image',
		}),
		MetaTitleField({
			hasGenerateFn: true,
		}),
		MetaImageField({
			relationTo: 'images',
		}),
		MetaDescriptionField({
			hasGenerateFn: true,
		}),
		PreviewField({
			// if the `generateUrl` function is configured
			hasGenerateFn: true,

			// field paths to match the target field for data
			titlePath: 'meta.title',
			descriptionPath: 'meta.description',
		}),
	],
};
