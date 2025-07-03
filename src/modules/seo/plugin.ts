import type { Post } from '@payload-types';
import { seoPlugin as seoPluginImport } from '@payloadcms/plugin-seo';
import type {
	GenerateDescription,
	GenerateTitle,
	GenerateURL,
} from 'node_modules/@payloadcms/plugin-seo/dist/types';
import type { Plugin } from 'payload';
import { getServerSideURL } from '@/modules/utilities/getURL';

const generateTitle: GenerateTitle<Post> = ({ doc }) => {
	return doc?.title ? `${doc.title} | EUI Goccia` : 'EUI Goccia';
};

const generateURL: GenerateURL<Post> = ({ doc }) => {
	const url = getServerSideURL();

	return doc?.slug ? `${url}/${doc.slug}` : url;
};

const generateDescription: GenerateDescription<Post> = ({ doc }) => {
	return doc?.description ?? '';
};

export const seoPlugin: Plugin = seoPluginImport({
	generateTitle,
	generateURL,
	generateDescription,
});
