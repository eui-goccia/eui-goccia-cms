import type { CollectionConfig } from 'payload';
import { slugField } from '../payload/fields/slug';

export const Authors: CollectionConfig = {
	slug: 'authors',
	labels: {
		singular: 'Autore',
		plural: 'Autori',
	},
	admin: {
		useAsTitle: 'name',
	},
	fields: [
		{
			name: 'name',
			type: 'text',
			required: true,
		},
		{
			name: 'posts',
			type: 'join',
			collection: 'posts',
			on: 'author',
			hasMany: true,
		},
		...slugField('name'),
	],
};
