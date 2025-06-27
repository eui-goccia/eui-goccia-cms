import type { Metadata } from 'next';

const defaultOpenGraph: Metadata['openGraph'] = {
	type: 'website',
	description: 'A project by EUI La Goccia.',
	images: [
		{
			url: process.env.NEXT_PUBLIC_URL
				? `${process.env.NEXT_PUBLIC_URL}/og-image.webp`
				: '/og-image.webp',
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
