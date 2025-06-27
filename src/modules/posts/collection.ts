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
};
