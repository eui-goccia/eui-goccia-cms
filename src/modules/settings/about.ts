import type { GlobalConfig } from 'payload';
import { revalidateGlobal } from '../utilities/revalidateGlobal';

export const About: GlobalConfig = {
	slug: 'about',
	label: 'Chi Siamo',
	hooks: {
		afterChange: [revalidateGlobal],
	},
	fields: [
		{
			name: 'description',
			type: 'textarea',
			required: true,
			label: 'Descrizione',
			localized: true,
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
					localized: true,
				},
				{
					name: 'bio',
					type: 'textarea',
					required: true,
					label: 'Biografia',
					localized: true,
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
					localized: true,
				},
				{
					name: 'links',
					type: 'group',
					label: 'Contatti',
					required: false,
					fields: [
						{
							name: 'website',
							type: 'text',
							label: 'Sito web',
						},
						{
							name: 'instagram',
							type: 'text',
							label: 'Instagram',
						},
						{
							name: 'facebook',
							type: 'text',
							label: 'Facebook',
						},
						{
							name: 'linkedin',
							type: 'text',
							label: 'LinkedIn',
						},
					],
				},
			],
		},
	],
};
