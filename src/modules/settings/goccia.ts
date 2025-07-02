import type { GlobalConfig } from 'payload';

export const Goccia: GlobalConfig = {
	slug: 'goccia',
	label: 'La Goccia',
	fields: [
		{
			name: 'description',
			type: 'textarea',
			required: true,
			label: 'Descrizione',
		},
		{
			name: 'timeline',
			type: 'array',
			label: 'Timeline',
			fields: [
				{
					name: 'title',
					type: 'text',
					required: true,
					label: 'Titolo',
				},
				{
					name: 'description',
					type: 'textarea',
					required: true,
					label: 'Descrizione',
				},
				{
					name: 'cover',
					type: 'upload',
					relationTo: 'images',
					required: true,
					label: 'Immagine di copertina',
				},
				{
					name: 'start',
					type: 'number',
					required: true,
					label: 'Inizio Periodo',
					admin: {
						description: "Inserire l'anno di inizio del periodo. IE: `2020`",
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
	],
};
