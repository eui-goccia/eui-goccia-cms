import {
	createBreadcrumbsField,
	createParentField,
} from '@payloadcms/plugin-nested-docs';
import type { CollectionConfig } from 'payload';
import { defaultBlocks } from '../blocks';
import { editor } from '../payload/access/editor';
import { editorOrPublished } from '../payload/access/editorOrPublished';
import { slugFieldFromItalian } from '../payload/fields/slug';
import { seoTab } from '../seo/fields';
import { revalidateEvent, revalidateEventDelete } from './revalidate';

export const Events: CollectionConfig = {
	slug: 'events',
	labels: {
		singular: 'Evento',
		plural: 'Eventi',
	},
	defaultPopulate: {
		coverImage: true,
		description: true,
		title: true,
		slug: true,
		startDate: true,
		endDate: true,
		parent: true,
		breadcrumbs: true,
		_status: true,
	},
	access: {
		read: editorOrPublished,
		create: editor,
		update: editor,
		delete: editor,
	},
	hooks: {
		afterChange: [revalidateEvent],
		afterDelete: [revalidateEventDelete],
	},
	admin: {
		useAsTitle: 'title',
		baseListFilter: () => ({ parent: { exists: false } }),
	},
	fields: [
		{
			type: 'tabs',
			tabs: [
				{
					label: 'Data',
					fields: [
						{
							name: 'title',
							label: 'Titolo',
							type: 'text',
							required: true,
							localized: true,
						},
						{
							name: 'content',
							type: 'blocks',
							label: 'Contenuto',
							blocks: defaultBlocks,
						},
					],
				},
				{
					label: 'Meta',
					fields: [
						{
							name: 'when',
							type: 'group',
							label: 'When',
							fields: [
								{
									name: 'startDate',
									type: 'date',
									label: 'Data di inizio',
									required: true,
									admin: {
										date: {
											pickerAppearance: 'dayAndTime',
										},
									},
								},
								{
									name: 'endDate',
									type: 'date',
									label: 'Data di fine',
									required: true,
									admin: {
										date: {
											pickerAppearance: 'dayAndTime',
										},
									},
								},
							],
						},
						{
							name: 'address',
							type: 'group',
							label: 'Where',
							fields: [
								{
									name: 'location',
									type: 'text',
									label: 'Luogo',
								},
								{
									name: 'googleMapsUrl',
									type: 'text',
									label: 'Link Google Maps',
								},
							],
						},
						{
							name: 'organizer',
							type: 'text',
							label: 'Organizzatore',
						},
						{
							name: 'links',
							type: 'array',
							label: 'Link utili',
							maxRows: 10,
							fields: [
								{
									name: 'label',
									type: 'text',
									label: 'Etichetta',
									required: true,
									localized: true,
								},
								{
									name: 'url',
									type: 'text',
									label: 'URL',
									required: true,
								},
							],
						},
						{
							name: 'bookingUrl',
							type: 'text',
							label: 'Link prenotazione',
						},
					],
				},
				{
					label: 'Sotto-eventi',
					admin: {
						condition: (data) => !data?.parent,
					},
					fields: [
						{
							name: 'subEvents',
							type: 'join',
							collection: 'events',
							on: 'parent',
							admin: {
								defaultColumns: [
									'title',
									'label',
									'startDate',
									'endDate',
									'address.location',
								],
								allowCreate: true,
							},
						},
					],
				},
				seoTab,
			],
		},
		{
			name: 'coverImage',
			type: 'upload',
			relationTo: 'images',
			required: true,
			hasMany: false,
			label: 'Immagine di copertina',
			admin: {
				position: 'sidebar',
			},
		},
		createParentField('events', {
			label: 'Evento principale',
			admin: {
				position: 'sidebar',
				readOnly: true,
			},
		}),
		createBreadcrumbsField('events', {
			admin: {
				hidden: true,
			},
		}),
		{
			name: 'label',
			type: 'select',
			label: 'Categoria',
			admin: {
				position: 'sidebar',
				condition: (data) => Boolean(data?.parent),
			},
			options: [
				{
					label: { it: 'Esplorazioni', en: 'Explorations' },
					value: 'esplorazioni',
				},
				{
					label: { it: 'Approfondimenti', en: 'Deep dives' },
					value: 'approfondimenti',
				},
				{
					label: {
						it: 'Attività per i più piccoli',
						en: 'Activities for children',
					},
					value: 'attivita-piccoli',
				},
				{
					label: {
						it: 'Talk, musica e arte',
						en: 'Talks, music and art',
					},
					value: 'talk-musica-arte',
				},
				{
					label: {
						it: 'Esposizioni e voci dal quartiere',
						en: 'Exhibitions and voices from the neighbourhood',
					},
					value: 'esposizioni-voci',
				},
			],
		},
		...slugFieldFromItalian('title'),
	],
	versions: {
		drafts: {
			schedulePublish: true,
		},
		maxPerDoc: 50,
	},
};
