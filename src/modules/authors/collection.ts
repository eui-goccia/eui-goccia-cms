import type { CollectionConfig } from 'payload';
import { anyone } from '../payload/access/anyone';
import { editor } from '../payload/access/editor';
import { slugField } from '../payload/fields/slug';
import { revalidateDelete, revalidatePost } from '../posts/revalidate';

export const Authors: CollectionConfig = {
	slug: 'authors',
	access: {
		read: anyone,
		create: editor,
		update: editor,
		delete: editor,
	},
	hooks: {
		afterChange: [revalidatePost],
		afterDelete: [revalidateDelete],
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
			type: 'textarea',
			label: 'Biografia',
			localized: true,
		},
		{
			name: 'image',
			type: 'upload',
			relationTo: 'images',
			label: 'Immagine',
		},
		{
			name: 'partner',
			type: 'textarea',
			label: 'Partner',
			localized: true,
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
