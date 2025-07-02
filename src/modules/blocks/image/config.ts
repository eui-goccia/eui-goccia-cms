import type { Block, Field } from 'payload';
import { alignFields } from '../common';

const imageSettingsFields: Field[] = [
	{
		type: 'collapsible',
		label: 'Settings',
		admin: {
			initCollapsed: true,
		},
		fields: [
			{
				name: 'width',
				label: 'Width',
				type: 'select',
				options: [
					{
						label: 'Full',
						value: 'full',
					},
					{
						label: 'Half',
						value: 'half',
					},
					{
						label: 'Third',
						value: 'third',
					},
				],
				defaultValue: 'full',
			},
			...alignFields('center', 'center'),
		],
	},
];

export const ImageBlock: Block = {
	slug: 'image',
	interfaceName: 'ImageBlock',
	labels: {
		singular: 'Image',
		plural: 'Images',
	},
	fields: [
		{
			name: 'image',
			type: 'upload',
			relationTo: 'images',
			required: true,
			label: 'Immagine',
		},
		...imageSettingsFields,
	],
};
