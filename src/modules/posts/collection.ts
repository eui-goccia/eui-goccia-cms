import type { CollectionConfig } from 'payload';
import { slugField } from '../payload/fields/slug';
import { seoTab } from '../seo/fields';
import { generatePreviewPath } from '../utilities/generatePreviewPath';

export const Posts: CollectionConfig = {
	slug: 'posts',
	labels: {
		singular: 'Articolo',
		plural: 'Articoli',
	},
	admin: {
		useAsTitle: 'title',
		livePreview: {
			url: ({ data, req }) => {
				const path = generatePreviewPath({
					slug: typeof data?.slug === 'string' ? data.slug : '',
					collection: 'posts',
					req,
				});

				return path;
			},
		},
		preview: (data, { req }) =>
			generatePreviewPath({
				slug: typeof data?.slug === 'string' ? data.slug : '',
				collection: 'posts',
				req,
			}),
	},
	fields: [
		{
			type: 'tabs',
			tabs: [
				{
					label: 'Data',
					fields: [
						{
							name: 'title',
							label: 'Titolo',
							type: 'text',
							required: true,
						},
						{
							name: 'description',
							type: 'textarea',
							required: true,
							label: 'Descrizione',
						},
						{
							name: 'content',
							type: 'richText',
							required: true,
							label: 'Contenuto',
						},
					],
				},
				seoTab,
			],
		},
		{
			name: 'coverImage',
			type: 'upload',
			relationTo: 'images',
			required: true,
			hasMany: false,
			label: 'Immagine di copertina',
			admin: {
				position: 'sidebar',
			},
		},
		{
			name: 'author',
			type: 'relationship',
			label: 'Autore',
			relationTo: 'authors',
			hasMany: false,
			required: true,
			admin: {
				position: 'sidebar',
			},
		},
		...slugField('title'),
	],
	versions: {
		drafts: {
			autosave: {
				interval: 300,
			},
			schedulePublish: true,
		},
		maxPerDoc: 50,
	},
};
