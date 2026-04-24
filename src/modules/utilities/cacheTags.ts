export const localesForInvalidation = ['it', 'en'] as const;

export function documentTag(collection: string, slug: string, locale?: string) {
	return `${collection}:${locale ?? 'default'}:doc:${slug}`;
}

export function documentBaseTag(collection: string, slug: string) {
	return `${collection}:doc:${slug}`;
}

export function collectionTag(collection: string, locale?: string) {
	return `${collection}:${locale ?? 'default'}:list`;
}

export function collectionBaseTag(collection: string) {
	return `${collection}:list`;
}

export function globalTag(slug: string, locale?: string) {
	return `global:${locale ?? 'default'}:${slug}`;
}

export function globalBaseTag(slug: string) {
	return `global:${slug}`;
}
