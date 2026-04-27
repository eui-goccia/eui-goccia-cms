import type { Event } from '@payload-types';

export type EventPathNode = Pick<Event, 'breadcrumbs' | 'slug'> & {
	parent?: string | EventPathNode | null;
};

export function getEventRelativePathFromParents(
	event: EventPathNode
): string | null {
	if (!event.slug) {
		return null;
	}

	const segments = [event.slug];
	let parent = event.parent;

	while (parent && typeof parent !== 'string') {
		if (!parent.slug) {
			return null;
		}

		segments.unshift(parent.slug);
		parent = parent.parent;
	}

	if (typeof parent === 'string') {
		return null;
	}

	return `/${segments.join('/')}`;
}

export function getEventRelativePath(event: EventPathNode): string {
	return (
		event.breadcrumbs?.at(-1)?.url ??
		getEventRelativePathFromParents(event) ??
		`/${event.slug}`
	);
}

export function getEventHref(event: EventPathNode): string {
	return `/eventi${getEventRelativePath(event)}`;
}
