import type { CollectionConfig } from 'payload';
import { slugField } from '../payload/fields/slug';

export const Tags: CollectionConfig = {
	slug: 'tags',
	labels: {
		singular: 'Tag',
		plural: 'Tags',
	},
	admin: {
		useAsTitle: 'name',
	},
	fields: [
		{
			name: 'name',
			type: 'text',
			label: 'Nome',
			required: true,
			localized: true,
			unique: true,
		},
		{
			name: 'description',
			label: 'Descrizione',
			type: 'text',
			localized: true,
		},
		{
			name: 'posts',
			type: 'join',
			on: 'tags',
			collection: 'posts',
		},
		...slugField('name'),
	],
};
