import type { GlobalConfig } from 'payload';

export const Goccia: GlobalConfig = {
	slug: 'goccia',
	label: 'La Goccia',
	fields: [
		{
			name: 'description',
			type: 'textarea',
			required: true,
		},
		{
			name: 'timeline',
			type: 'array',
			fields: [
				{
					name: 'title',
					type: 'text',
					required: true,
				},
				{
					name: 'description',
					type: 'textarea',
					required: true,
				},
				{
					name: 'cover',
					type: 'upload',
					relationTo: 'images',
					required: true,
				},
				{
					name: 'start',
					type: 'number',
					required: true,
				},
				{
					name: 'end',
					type: 'number',
				},
			],
		},
	],
};
