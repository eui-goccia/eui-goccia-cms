import configPromise from '@payload-config';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { getPayload } from 'payload';
import type { Locales } from '@/i18n/routing';
import { EventContentSection } from '@/modules/events/components/EventContentSection';
import { EventHero } from '@/modules/events/components/EventHero';
import { EventProgramSection } from '@/modules/events/components/EventProgramSection';
import { groupSubEventsByLabel } from '@/modules/events/utils';

interface ParentEventPageProps {
	params: Promise<{ locale: string; slug: string }>;
}

export default async function ParentEventPage({
	params,
}: ParentEventPageProps) {
	const { locale, slug } = await params;
	setRequestLocale(locale);
	const { isEnabled: draft } = await draftMode();

	const payload = await getPayload({ config: configPromise });
	const events = await payload.find({
		collection: 'events',
		depth: 2,
		draft,
		overrideAccess: draft,
		locale: locale as Locales,
		where: {
			'breadcrumbs.url': { equals: `/${slug}` },
		},
		joins: false,
	});

	const event = events.docs.find((doc) => {
		const lastBreadcrumb = doc.breadcrumbs?.at(-1);
		return lastBreadcrumb?.url === `/${slug}`;
	});
	if (!event) {
		notFound();
	}

	const subEvents = await payload.find({
		collection: 'events',
		depth: 1,
		draft,
		overrideAccess: draft,
		locale: locale as Locales,
		limit: 50,
		sort: 'when_startDate',
		where: {
			parent: { equals: event.id },
			...(draft ? {} : { _status: { equals: 'published' } }),
		},
	});

	const subEventGroups = groupSubEventsByLabel(subEvents.docs);

	return (
		<div className='min-h-screen bg-red-300'>
			<EventHero
				backHref='/eventi'
				backLabel={locale === 'it' ? 'Torna agli eventi' : 'Back to events'}
				event={event}
			/>
			<EventContentSection event={event} locale={locale} />
			<EventProgramSection locale={locale} subEventGroups={subEventGroups} />
		</div>
	);
}
