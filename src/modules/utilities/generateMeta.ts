import type { Config, Image, Post } from '@payload-types';
import type { Metadata } from 'next';
import { getServerSideURL } from './getURL';
import { mergeOpenGraph } from './mergeOpenGraph';

const getImageURL = (image?: Image | Config['db']['defaultIDType'] | null) => {
	const serverUrl = getServerSideURL();

	let url = `${serverUrl}/eui-goccia-og.webp`;

	if (image && typeof image === 'object' && 'url' in image) {
		const ogUrl = image.sizes?.og?.url;

		url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url;
	}

	return url;
};

export const generateMeta = async (args: {
	doc: Partial<Post> | null;
}): Promise<Metadata> => {
	const { doc } = args;

	const ogImage = getImageURL(doc?.coverImage);

	const title = doc?.title
		? `${doc?.title} | EUI Goccia`
		: 'Payload Website Template';

	return {
		description: doc?.description,
		openGraph: mergeOpenGraph({
			description: doc?.description || '',
			images: ogImage
				? [
						{
							url: ogImage,
						},
					]
				: undefined,
			title,
			url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
		}),
		title,
	};
};
