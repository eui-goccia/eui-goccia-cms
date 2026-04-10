import configPromise from '@payload-config';
import type { Event } from '@payload-types';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import { connection } from 'next/server';
import { getPayload } from 'payload';
import type { Locales } from '@/i18n/routing';
import { EventContentSection } from './components/EventContentSection';
import { EventHero } from './components/EventHero';
import { EventProgramSection } from './components/EventProgramSection';
import { getEventRelativePath } from './paths';
import { groupSubEventsByLabel } from './utils';

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
	const relativePath = `/${segments.join('/')}`;
	const leafSlug = segments.at(-1);

	const exactMatches = await payload.find({
		collection: 'events',
		depth: 2,
		draft,
		overrideAccess: draft,
		joins: false,
		limit: 50,
		locale: locale as Locales,
		where: {
			'breadcrumbs.url': { equals: relativePath },
		},
	});

	const exactEvent = exactMatches.docs.find(
		(doc) => doc.breadcrumbs?.at(-1)?.url === relativePath
	);

	if (exactEvent) {
		return { event: exactEvent, payload };
	}

	if (!leafSlug) {
		return { event: null, payload };
	}

	const fallbackMatches = await payload.find({
		collection: 'events',
		depth: 2,
		draft,
		overrideAccess: draft,
		joins: false,
		limit: 50,
		locale: locale as Locales,
		where: {
			slug: { equals: leafSlug },
		},
	});

	return {
		event:
			fallbackMatches.docs.find(
				(doc) => getEventRelativePath(doc) === relativePath
			) ?? null,
		payload,
	};
}

export async function EventDetailContent({
	locale,
	segments,
}: {
	locale: string;
	segments: string[];
}) {
	await connection();

	const { isEnabled: draft } = await draftMode();
	const { event, payload } = await findEventBySegments({
		draft,
		locale,
		segments,
	});

	if (!event) {
		notFound();
	}

	let subEventGroups = new Map<string, Event[]>();

	if (event.showProgram) {
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

		subEventGroups = groupSubEventsByLabel(subEvents.docs, {
			includeDrafts: draft,
		});
	}

	const isNestedEvent = segments.length > 1;
	const currentPath = `/eventi/${segments.join('/')}`;
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
				<EventProgramSection
					eventPath={currentPath}
					locale={locale}
					subEventGroups={subEventGroups}
				/>
			) : null}
		</div>
	);
}
