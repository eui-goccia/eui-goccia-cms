import type { CollectionConfig } from 'payload';
import { defaultBlocks } from '../blocks';
import { editor } from '../payload/access/editor';
import { editorOrPublished } from '../payload/access/editorOrPublished';
import { slugFieldFromItalian } from '../payload/fields/slug';
import { seoTab } from '../seo/fields';
import { generatePreviewPath } from '../utilities/generatePreviewPath';
import { revalidateDelete, revalidatePost } from './revalidate';

export const Posts: CollectionConfig = {
	slug: 'posts',
	labels: {
		singular: 'Articolo',
		plural: 'Articoli',
	},
	defaultPopulate: {
		author: {
			select: {
				name: true,
			},
		},
		coverImage: true,
		content: true,
		description: true,
		title: true,
		slug: true,
		publishedAt: true,
		_status: true,
	},
	access: {
		read: editorOrPublished,
		create: editor,
		update: editor,
		delete: editor,
	},
	hooks: {
		afterChange: [revalidatePost],
		afterDelete: [revalidateDelete],
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
							localized: true,
						},
						{
							name: 'description',
							type: 'textarea',
							label: 'Descrizione',
							localized: true,
						},
						{
							name: 'tags',
							type: 'relationship',
							label: 'Tags',
							relationTo: 'tags',
							hasMany: true,
						},
						{
							name: 'content',
							type: 'blocks',
							required: true,
							label: 'Contenuto',
							blocks: defaultBlocks,
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
		{
			name: 'publishedAt',
			type: 'date',
			label: 'Data di pubblicazione',
			admin: {
				position: 'sidebar',
				date: {
					pickerAppearance: 'dayAndTime',
				},
			},
			hooks: {
				beforeChange: [
					({ siblingData, value }) => {
						if (siblingData._status === 'published' && !value) {
							return new Date();
						}
						return value;
					},
				],
			},
		},
		...slugFieldFromItalian('title'),
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
