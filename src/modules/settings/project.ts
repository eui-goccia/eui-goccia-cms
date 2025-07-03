import type { GlobalConfig } from 'payload';
import { defaultBlocks } from '../blocks';
import { formatSlug } from '../payload/fields/slug/formatSlug';
import { revalidateGlobal } from '../utilities/revalidateGlobal';

export const Project: GlobalConfig = {
	slug: 'progetto',
	label: 'Progetto',
	hooks: {
		afterChange: [revalidateGlobal],
	},
	fields: [
		{
			name: 'sections',
			type: 'array',
			fields: [
				{
					name: 'title',
					type: 'text',
					required: true,
					label: 'Titolo',
				},
				{
					name: 'content',
					type: 'blocks',
					required: true,
					label: 'Contenuto',
					blocks: defaultBlocks,
				},
				{
					name: 'url',
					type: 'text',
					required: true,
					admin: {
						hidden: true,
					},
					hooks: {
						beforeChange: [
							({ siblingData }) => {
								if (!siblingData.url || siblingData.url === '') {
									siblingData.url = `#${formatSlug(siblingData.title)}`;
								}
							},
						],
					},
				},
			],
		},
	],
};
