import type { CollectionConfig } from 'payload';
import { anyone } from '../payload/access/anyone';
import { authenticated } from '../payload/access/authenticated';
import { slugField } from '../payload/fields/slug';

export const Authors: CollectionConfig = {
	slug: 'authors',
	access: {
		read: anyone,
		create: authenticated,
		update: authenticated,
		delete: authenticated,
	},
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
			label: 'Nome',
		},
		{
			name: 'bio',
			type: 'text',
			label: 'Biografia',
		},
		{
			name: 'posts',
			type: 'join',
			collection: 'posts',
			on: 'author',
			hasMany: true,
			label: 'Articoli',
		},
		...slugField('name'),
	],
};
