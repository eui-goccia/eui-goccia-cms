import type { GlobalConfig } from 'payload';

export const About: GlobalConfig = {
	slug: 'about',
	label: 'Chi Siamo',
	fields: [
		{
			name: 'description',
			type: 'textarea',
			required: true,
		},
		{
			name: 'partners',
			type: 'array',
			fields: [
				{
					name: 'name',
					type: 'text',
					required: true,
				},
				{
					name: 'bio',
					type: 'textarea',
					required: true,
				},
				{
					name: 'logo',
					type: 'upload',
					relationTo: 'images',
					required: true,
				},
				{
					name: 'members',
					type: 'textarea',
				},
			],
		},
	],
};
