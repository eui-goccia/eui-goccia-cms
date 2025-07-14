import type { Field, GlobalConfig } from 'payload';
import { revalidateGlobal } from '../utilities/revalidateGlobal';

const arrayFields: Field[] = [
	{
		type: 'text',
		name: 'data',
		localized: true,
	},
	{
		type: 'text',
		name: 'caption',
		localized: true,
	},
	{
		type: 'upload',
		name: 'image',
		relationTo: 'images',
		required: true,
	},
];

export const Home: GlobalConfig = {
	slug: 'home',
	admin: {
		group: 'Pages',
	},
	hooks: {
		afterChange: [revalidateGlobal],
	},
	fields: [
		{
			type: 'group',
			label: 'Hero Section',
			fields: [
				{
					name: 'hero_title',
					label: 'Hero Title',
					type: 'upload',
					relationTo: 'images',
					required: true,
				},
				{
					name: 'hero_texture',
					label: 'Hero Texture',
					type: 'upload',
					relationTo: 'images',
					required: true,
				},
				{
					name: 'hero_image',
					label: 'Hero Image',
					type: 'upload',
					relationTo: 'images',
					required: true,
				},
			],
		},
		{
			type: 'group',
			label: 'Intro Text',
			fields: [
				{
					name: 'intro_text_1',
					label: 'Intro Text 1',
					type: 'richText',
					required: true,
					localized: true,
					admin: {
						description: 'Intro text (before marquee)',
					},
				},
				{
					name: 'intro_text_2',
					label: 'Intro Text 2',
					type: 'richText',
					required: true,
					localized: true,
					admin: {
						description: 'Intro text (after marquee)',
					},
				},
			],
		},
		{
			name: 'forest',
			type: 'array',
			fields: arrayFields,
		},
		{
			name: 'what',
			type: 'array',
			fields: arrayFields,
		},
	],
};
