import type { CollectionConfig } from 'payload';

export const Users: CollectionConfig = {
	slug: 'users',
	labels: {
		singular: 'Utente',
		plural: 'Utenti',
	},
	admin: {
		useAsTitle: 'email',
		group: 'Administration',
	},
	auth: true,
	fields: [
		// Email added by default
		// Add more fields as needed
	],
};
