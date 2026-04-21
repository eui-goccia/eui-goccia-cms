import type { CollectionConfig, PayloadRequest } from 'payload';
import { editor } from '../payload/access/editor';
import { editorOrPublished } from '../payload/access/editorOrPublished';
import { slugFieldFromItalian } from '../payload/fields/slug';
import { generatePreviewPath } from '../utilities/generatePreviewPath';
import { WORK_PACKAGE_OPTIONS } from './config';
import { validatePartnerId } from './partners';
import { revalidateResource, revalidateResourceDelete } from './revalidate';

export const Resources: CollectionConfig = {
	slug: 'resources',
	labels: {
		singular: 'Risorsa',
		plural: 'Risorse',
	},
	defaultPopulate: {
		title: true,
		slug: true,
		date: true,
		tags: true,
		workPackage: true,
		partnerId: true,
		description: true,
		dataPoints: true,
		gallery: true,
		documentUpdates: true,
		_status: true,
	},
	access: {
		read: editorOrPublished,
		create: editor,
		update: editor,
		delete: editor,
	},
	hooks: {
		afterChange: [revalidateResource],
		afterDelete: [revalidateResourceDelete],
	},
	admin: {
		useAsTitle: 'title',
		livePreview: {
			url: ({ data }) =>
				generatePreviewPath({
					slug: typeof data?.slug === 'string' ? data.slug : '',
					collection: 'resources',
				}),
		},
		preview: (data) =>
			generatePreviewPath({
				slug: typeof data?.slug === 'string' ? data.slug : '',
				collection: 'resources',
			}),
	},
	fields: [
		{
			type: 'tabs',
			tabs: [
				{
					label: 'Contenuto',
					fields: [
						{
							name: 'title',
							label: 'Titolo',
							type: 'text',
							required: true,
							localized: true,
						},
						{
							name: 'description',
							type: 'richText',
							label: 'Descrizione',
							required: true,
							localized: true,
						},
						{
							name: 'dataPoints',
							type: 'array',
							label: 'Dati',
							fields: [
								{
									name: 'value',
									type: 'text',
									label: 'Dato',
									required: true,
									localized: true,
								},
							],
						},
						{
							name: 'gallery',
							type: 'upload',
							relationTo: 'images',
							label: 'Galleria',
							hasMany: true,
						},
						{
							name: 'documentUpdates',
							type: 'array',
							label: 'Aggiornamenti documento',
							fields: [
								{
									name: 'date',
									type: 'date',
									label: 'Data',
									required: true,
									admin: {
										date: {
											displayFormat: 'dd/MM/yyyy',
											pickerAppearance: 'dayOnly',
										},
									},
								},
								{
									name: 'title',
									type: 'text',
									label: 'Titolo',
									required: true,
									localized: true,
								},
								{
									name: 'description',
									type: 'textarea',
									label: 'Descrizione',
									localized: true,
								},
								{
									name: 'url',
									type: 'text',
									label: 'URL',
								},
								{
									name: 'ctaLabel',
									type: 'text',
									label: 'Etichetta CTA',
									localized: true,
								},
							],
						},
					],
				},
				{
					label: 'Meta',
					fields: [
						{
							name: 'date',
							type: 'date',
							label: 'Data',
							required: true,
							admin: {
								date: {
									displayFormat: 'dd/MM/yyyy',
									pickerAppearance: 'dayOnly',
								},
							},
						},
						{
							name: 'tags',
							type: 'relationship',
							label: 'Tag',
							relationTo: 'tags',
							hasMany: true,
						},
						{
							name: 'workPackage',
							type: 'select',
							label: 'Work Package',
							required: true,
							options: WORK_PACKAGE_OPTIONS,
						},
						{
							name: 'partnerId',
							type: 'text',
							label: 'Partner',
							required: true,
							validate: async (
								value: string | null | undefined,
								{ req }: { req: PayloadRequest }
							) => validatePartnerId(value, req),
							admin: {
								components: {
									Field:
										'@/modules/payload/fields/partnerSelect/PartnerSelectFieldServer#PartnerSelectFieldServer',
								},
							},
						},
					],
				},
			],
		},
		...slugFieldFromItalian('title', {}, 'resources'),
	],
	versions: {
		drafts: {
			schedulePublish: true,
		},
		maxPerDoc: 50,
	},
};
