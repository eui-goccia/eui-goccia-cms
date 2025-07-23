import type { CollectionConfig } from 'payload';
import { anyone } from '../payload/access/anyone';
import { editor } from '../payload/access/editor';
import { slugField } from '../payload/fields/slug';

export const Tags: CollectionConfig = {
	slug: 'tags',
	labels: {
		singular: 'Tag',
		plural: 'Tags',
	},
	access: {
		read: anyone,
		create: editor,
		update: editor,
		delete: editor,
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
