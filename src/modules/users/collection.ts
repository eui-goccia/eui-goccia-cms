import type { CollectionConfig } from 'payload';
import { admin } from '../payload/access/admin';
import { self } from '../payload/access/self';

export const Users: CollectionConfig = {
	slug: 'users',
	labels: {
		singular: 'Utente',
		plural: 'Utenti',
	},
	access: {
		read: self,
		create: admin,
		update: admin,
		delete: admin,
	},
	admin: {
		useAsTitle: 'email',
		group: 'Administration',
	},
	auth: true,
	fields: [
		{
			name: 'role',
			type: 'select',
			label: {
				en: 'Role',
				it: 'Ruolo',
			},
			options: [
				{
					label: 'Admin',
					value: 'admin',
				},
				{
					label: 'Editor',
					value: 'editor',
				},
				{
					label: 'User',
					value: 'user',
				},
			],
			defaultValue: 'user',
			required: true,
		},
	],
};
