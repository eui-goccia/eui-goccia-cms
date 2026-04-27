import type { Event, Post, Resource } from '@payload-types';
import { seoPlugin as seoPluginImport } from '@payloadcms/plugin-seo';
import type {
	GenerateDescription,
	GenerateTitle,
	GenerateURL,
} from '@payloadcms/plugin-seo/types';
import type { Plugin } from 'payload';
import { getEventRelativePath } from '@/modules/events/paths';
import { getServerSideURL } from '@/modules/utilities/getURL';

type SEODoc = Partial<Event> | Partial<Post> | Partial<Resource>;

const generateTitle: GenerateTitle<SEODoc> = ({ doc }) =>
	doc?.title ? `${doc.title} | EUI Goccia` : 'EUI Goccia';

export function getCanonicalPath({
	collection,
	doc,
}: {
	collection?: string;
	doc: SEODoc;
}): string {
	const slug = typeof doc?.slug === 'string' ? doc.slug : '';

	if (!slug) {
		return '/';
	}

	switch (collection) {
		case 'posts':
			return `/blog/${slug}`;
		case 'events':
			return `/eventi${getEventRelativePath(doc as Partial<Event> & { slug: string })}`;
		case 'resources':
			return `/risorse/${slug}`;
		default:
			return `/${slug}`;
	}
}

export const generateURL: GenerateURL<SEODoc> = ({
	collectionConfig,
	collectionSlug,
	doc,
}) => {
	const url = getServerSideURL();
	const path = getCanonicalPath({
		collection: collectionConfig?.slug ?? collectionSlug,
		doc,
	});

	return path === '/' ? url : `${url}${path}`;
};

const generateDescription: GenerateDescription<SEODoc> = ({ doc }) =>
	typeof doc?.description === 'string' ? doc.description : '';

export const seoPlugin: Plugin = seoPluginImport({
	generateTitle,
	generateURL,
	generateDescription,
});
