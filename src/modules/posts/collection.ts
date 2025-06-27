import type { CollectionConfig } from 'payload';
import { slugField } from '../payload/fields/slug';

export const Posts: CollectionConfig = {
	slug: 'posts',
	labels: {
		singular: 'Articolo',
		plural: 'Articoli',
	},
	admin: {
		useAsTitle: 'title',
	},
	fields: [
		{
			name: 'title',
			type: 'text',
			required: true,
		},
		{
			name: 'description',
			type: 'textarea',
			required: true,
		},
		{
			name: 'content',
			type: 'richText',
			required: true,
		},
		{
			name: 'coverImage',
			type: 'upload',
			relationTo: 'images',
			required: true,
			hasMany: false,
			admin: {
				position: 'sidebar',
			},
		},
		{
			name: 'author',
			type: 'relationship',
			relationTo: 'authors',
			hasMany: false,
			required: true,
			admin: {
				position: 'sidebar',
			},
		},
		...slugField('title'),
	],
};
