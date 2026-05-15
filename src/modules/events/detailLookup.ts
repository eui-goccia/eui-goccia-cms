import type { Where } from 'payload';

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
		limit: 1,
		locale,
	};
}

export function getEventDetailSegmentWhere({
	parentID,
	slug,
}: {
	parentID: null | number | string;
	slug: string;
}): Where {
	return {
		and: [
			{ slug: { equals: slug } },
			parentID === null
				? { parent: { exists: false } }
				: { parent: { equals: parentID } },
		],
	};
}
