import type { GlobalConfig } from 'payload';
import { revalidateGlobal } from '../utilities/revalidateGlobal';

export const Goccia: GlobalConfig = {
	slug: 'la-goccia',
	label: 'La Goccia',
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
			name: 'timeline',
			type: 'array',
			label: 'Timeline',
			fields: [
				{
					type: 'row',
					fields: [
						{
							name: 'start',
							type: 'number',
							required: true,
							label: 'Inizio Periodo',
							admin: {
								description:
									"Inserire l'anno di inizio del periodo. IE: `2020`",
							},
						},
						{
							name: 'end',
							type: 'number',
							label: 'Fine Periodo',
							admin: {
								description: "Inserire l'anno di fine del periodo. IE: `2025`",
							},
						},
					],
				},
				{
					name: 'title',
					type: 'text',
					required: true,
					label: 'Titolo',
					localized: true,
				},
				{
					name: 'description',
					type: 'textarea',
					required: true,
					label: 'Descrizione',
					localized: true,
				},
				{
					name: 'cover',
					type: 'upload',
					relationTo: 'images',
					required: true,
					label: 'Immagine di copertina',
				},
			],
		},
	],
};
