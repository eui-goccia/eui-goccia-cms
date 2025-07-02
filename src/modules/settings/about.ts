import type { GlobalConfig } from 'payload';

export const About: GlobalConfig = {
	slug: 'about',
	label: 'Chi Siamo',
	fields: [
		{
			name: 'description',
			type: 'textarea',
			required: true,
			label: 'Descrizione',
		},
		{
			name: 'partners',
			type: 'array',
			label: 'Partner',
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
					required: true,
					label: 'Biografia',
				},
				{
					name: 'logo',
					type: 'upload',
					relationTo: 'images',
					label: 'Logo',
				},
				{
					name: 'members',
					type: 'textarea',
					label: 'Membri',
				},
			],
		},
	],
};
