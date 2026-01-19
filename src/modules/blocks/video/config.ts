import type { Block } from 'payload';

export const VideoBlock: Block = {
	slug: 'video',
	interfaceName: 'VideoBlock',
	labels: {
		singular: 'Video',
		plural: 'Videos',
	},
	fields: [
		{
			name: 'url',
			type: 'text',
			label: 'Video URL',
			required: true,
			admin: {
				description:
					'Supporta YouTube, Vimeo, Dailymotion, SoundCloud, Twitch, e altri servizi',
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
					name: 'light',
					type: 'checkbox',
					label: 'Show Thumbnail Preview',
					defaultValue: true,
				},
				{
					name: 'aspectRatio',
					type: 'select',
					label: 'Aspect Ratio',
					options: [
						{ label: '16:9', value: '16/9' },
						{ label: '4:3', value: '4/3' },
						{ label: '1:1', value: '1/1' },
						{ label: '9:16', value: '9/16' },
					],
					defaultValue: '16/9',
				},
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
