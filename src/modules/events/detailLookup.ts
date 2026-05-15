import type { Where } from 'payload';

export function getEventDetailRelativePath(segments: string[]): string {
	return `/${segments.join('/')}`;
}

export function getEventDetailQueryOptions({
	draft,
	locale,
}: {
	draft: boolean;
	locale: string;
}) {
	return {
		collection: 'events' as const,
		depth: 2,
		draft,
		overrideAccess: draft,
		joins: false as const,
		limit: 50,
		locale,
	};
}

export function getEventDetailExactWhere(relativePath: string): Where {
	return {
		'breadcrumbs.url': { equals: relativePath },
	};
}

export function getEventDetailFallbackWhere(leafSlug: string): Where {
	return {
		slug: { equals: leafSlug },
	};
}
