import 'server-only';

import configPromise from '@payload-config';
import type { Event } from '@payload-types';
import { cacheLife, cacheTag } from 'next/cache';
import { notFound } from 'next/navigation';
import { getPayload, type Where } from 'payload';
import type { Locales } from '@/i18n/routing';
import {
	collectionBaseTag,
	collectionTag,
} from '@/modules/utilities/cacheTags';
import {
	EventContent2Section,
	EventContentSection,
} from './components/EventContentSection';
import { EventHero } from './components/EventHero';
import { EventProgramSection } from './components/EventProgramSection';
import {
	getEventDetailExactWhere,
	getEventDetailFallbackWhere,
	getEventDetailQueryOptions,
	getEventDetailRelativePath,
} from './detailLookup';
import { getEventRelativePath } from './paths';
import { groupSubEventsByLabel } from './utils';

interface EventDetailData {
	event: Event | null;
	subEventGroups: Map<string, Event[]>;
}

async function findEventBySegments({
	draft,
	locale,
	segments,
}: {
	draft: boolean;
	locale: string;
	segments: string[];
}) {
	const payload = await getPayload({ config: configPromise });
	const relativePath = getEventDetailRelativePath(segments);
	const leafSlug = segments.at(-1);
	const queryOptions = getEventDetailQueryOptions({ draft, locale });
	const findEvents = (where: Where) =>
		payload.find({
			...queryOptions,
			locale: queryOptions.locale as Locales,
			where,
		});

	const exactMatches = await findEvents(getEventDetailExactWhere(relativePath));

	const exactEvent = exactMatches.docs.find(
		(doc) => doc.breadcrumbs?.at(-1)?.url === relativePath
	);

	if (exactEvent) {
		return { event: exactEvent, payload };
	}

	if (!leafSlug) {
		return { event: null, payload };
	}

	const fallbackMatches = await findEvents(
		getEventDetailFallbackWhere(leafSlug)
	);

	return {
		event:
			fallbackMatches.docs.find(
				(doc) => getEventRelativePath(doc) === relativePath
			) ?? null,
		payload,
	};
}

async function getEventDetailData({
	draft,
	locale,
	segments,
}: {
	draft: boolean;
	locale: string;
	segments: string[];
}): Promise<EventDetailData> {
	const { event, payload } = await findEventBySegments({
		draft,
		locale,
		segments,
	});

	if (!event) {
		return {
			event: null,
			subEventGroups: new Map<string, Event[]>(),
		};
	}

	if (!event.showProgram) {
		return {
			event,
			subEventGroups: new Map<string, Event[]>(),
		};
	}

	const subEvents = await payload.find({
		collection: 'events',
		depth: 1,
		draft,
		overrideAccess: draft,
		limit: 100,
		locale: locale as Locales,
		sort: 'when.startDate',
		where: {
			parent: { equals: event.id },
			...(draft ? {} : { _status: { equals: 'published' } }),
		},
	});

	return {
		event,
		subEventGroups: groupSubEventsByLabel(subEvents.docs, {
			includeDrafts: draft,
		}),
	};
}

async function getPublishedEventDetailData(
	locale: string,
	segments: string[]
): Promise<EventDetailData> {
	'use cache';
	cacheLife('max');
	cacheTag(collectionBaseTag('events'), collectionTag('events', locale));

	return getEventDetailData({
		draft: false,
		locale,
		segments,
	});
}

async function getDraftEventDetailData(
	locale: string,
	segments: string[]
): Promise<EventDetailData> {
	return getEventDetailData({
		draft: true,
		locale,
		segments,
	});
}

export async function EventDetailContent({
	draft = false,
	locale,
	segments,
}: {
	draft?: boolean;
	locale: string;
	segments: string[];
}) {
	const { event, subEventGroups } = draft
		? await getDraftEventDetailData(locale, segments)
		: await getPublishedEventDetailData(locale, segments);

	if (!event) {
		notFound();
	}

	const isNestedEvent = segments.length > 1;
	const backHref = isNestedEvent
		? `/eventi/${segments.slice(0, -1).join('/')}`
		: '/eventi';
	let backLabel = 'Back to events';

	if (locale === 'it') {
		backLabel = isNestedEvent ? "Torna all'evento" : 'Torna agli eventi';
	} else if (isNestedEvent) {
		backLabel = 'Back to event';
	}

	return (
		<div className='min-h-screen bg-blu-300'>
			<EventHero
				backHref={backHref}
				backLabel={backLabel}
				event={event}
				locale={locale}
			/>
			<EventContentSection event={event} locale={locale} />
			{event.showProgram && subEventGroups.size > 0 ? (
				<EventProgramSection locale={locale} subEventGroups={subEventGroups} />
			) : null}
			<EventContent2Section event={event} />
		</div>
	);
}
