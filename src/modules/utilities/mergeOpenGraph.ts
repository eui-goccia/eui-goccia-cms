import type { Metadata } from 'next';
import { getServerSideURL } from '@/modules/utilities/getURL';

const defaultOpenGraph: Metadata['openGraph'] = {
	type: 'website',
	description: 'A project by EUI La Goccia.',
	images: [
		{
			url: `${getServerSideURL()}/og-image.webp`,
		},
	],
	siteName: 'EUI La Goccia',
	title: 'EUI - La Goccia',
};

export const mergeOpenGraph = (
	og?: Metadata['openGraph']
): Metadata['openGraph'] => {
	return {
		...defaultOpenGraph,
		...og,
		images: og?.images ? og.images : defaultOpenGraph.images,
	};
};
