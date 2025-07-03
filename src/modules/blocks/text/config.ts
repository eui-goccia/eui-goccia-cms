import type { Block } from 'payload';
import { alignFields } from '../common';

export const TextBlock: Block = {
	slug: 'text',
	interfaceName: 'TextBlock',
	fields: [
		{
			name: 'content',
			type: 'text',
			required: true,
			localized: true,
		},
		...alignFields(),
	],
};
