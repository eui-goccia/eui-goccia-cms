import type { CollectionSlug } from 'payload';

const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
	posts: '/blog',
	events: '/eventi',
	resources: '/risorse',
};

interface Props {
	collection: keyof typeof collectionPrefixMap;
	path?: string;
	slug: string;
}

export const generatePreviewPath = ({ collection, path, slug }: Props) => {
	const encodedParams = new URLSearchParams({
		slug,
		collection,
		path: path ?? `${collectionPrefixMap[collection]}/${slug}`,
		previewSecret: process.env.PREVIEW_SECRET || '',
	});

	const url = `/next/preview?${encodedParams.toString()}`;

	return url;
};
