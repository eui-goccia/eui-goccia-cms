import type { Block } from 'payload';

export const AudioBlock: Block = {
	slug: 'audio',
	interfaceName: 'AudioBlock',
	labels: {
		singular: 'Audio',
		plural: 'Audio',
	},
	fields: [
		{
			name: 'sourceType',
			type: 'radio',
			label: 'Source Type',
			options: [
				{ label: 'URL (SoundCloud, Mixcloud, etc.)', value: 'url' },
				{ label: 'Upload File', value: 'upload' },
			],
			defaultValue: 'url',
			admin: {
				layout: 'horizontal',
			},
		},
		{
			name: 'url',
			type: 'text',
			label: 'Audio URL',
			admin: {
				description: 'Supports SoundCloud, Mixcloud, and other audio services',
				condition: (_, siblingData) => siblingData?.sourceType === 'url',
			},
		},
		{
			name: 'audioFile',
			type: 'upload',
			relationTo: 'audio',
			label: 'Audio File',
			admin: {
				condition: (_, siblingData) => siblingData?.sourceType === 'upload',
			},
		},
		{
			name: 'title',
			type: 'text',
			label: 'Title',
			localized: true,
		},
		{
			name: 'caption',
			type: 'text',
			label: 'Caption',
			localized: true,
		},
		{
			type: 'collapsible',
			label: 'Settings',
			admin: { initCollapsed: true },
			fields: [
				{
					name: 'width',
					type: 'select',
					label: 'Width',
					options: [
						{ label: 'Full', value: 'full' },
						{ label: 'Half', value: 'half' },
						{ label: 'Third', value: 'third' },
					],
					defaultValue: 'full',
				},
				{
					name: 'horizontal',
					type: 'select',
					label: 'Alignment',
					options: [
						{ label: 'Left', value: 'left' },
						{ label: 'Center', value: 'center' },
						{ label: 'Right', value: 'right' },
					],
					defaultValue: 'center',
				},
			],
		},
	],
};
