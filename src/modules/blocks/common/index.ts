import type { Field } from 'payload';

export const alignFields = (
	defaultVertical = 'top',
	defaultHorizontal = 'left'
): Field[] => [
	{
		type: 'collapsible',
		label: 'Alignment',
		admin: {
			initCollapsed: true,
		},
		fields: [
			{
				type: 'row',
				fields: [
					{
						name: 'vertical',
						type: 'select',
						options: ['top', 'center', 'bottom'],
						defaultValue: defaultVertical,
					},
					{
						name: 'horizontal',
						type: 'select',
						options: ['left', 'center', 'right'],
						defaultValue: defaultHorizontal,
					},
				],
			},
		],
	},
];
