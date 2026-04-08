import configPromise from '@payload-config';
import type { Event } from '@payload-types';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import { connection } from 'next/server';
import { setRequestLocale } from 'next-intl/server';
import { getPayload, type PaginatedDocs } from 'payload';
import { Suspense } from 'react';
import localization from '@/i18n/localization';
import type { Locales } from '@/i18n/routing';
import { EventContentSection } from '@/modules/events/components/EventContentSection';
import { EventHero } from '@/modules/events/components/EventHero';
import { EventProgramSection } from '@/modules/events/components/EventProgramSection';
import { groupSubEventsByLabel } from '@/modules/events/utils';
import { getDocuments } from '@/modules/utilities/getDocument';

interface ParentEventPageProps {
	params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
	const slugSet = new Set<string>();

	for (const localeConfig of localization.locales) {
		const locale = localeConfig.code as Locales;

		try {
			const events = (await getDocuments({
				collection: 'events',
				depth: 0,
				limit: 50,
				draft: false,
				locale,
				sort: 'createdAt',
			})) as PaginatedDocs<Event>;

			for (const event of events.docs) {
				const lastBreadcrumb = event.breadcrumbs?.at(-1);
				if (lastBreadcrumb?.url) {
					const slug = lastBreadcrumb.url.replace(/^\//, '');
					if (slug && !slug.includes('/')) {
						slugSet.add(slug);
					}
				}
			}
		} catch {
			// Build-time static param generation may fail
		}
	}

	const slugs = Array.from(slugSet).map((slug) => ({ slug }));

	return slugs.length > 0 ? slugs : [{ slug: '_placeholder' }];
}

async function ParentEventContent({
	locale,
	slug,
}: {
	locale: string;
	slug: string;
}) {
	await connection();
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
		sort: 'when.startDate',
		where: {
			parent: { equals: event.id },
			...(draft ? {} : { _status: { equals: 'published' } }),
		},
	});

	const subEventGroups = groupSubEventsByLabel(subEvents.docs);

	return (
		<div className='min-h-screen bg-blu-300'>
			<EventHero
				backHref='/eventi'
				backLabel={locale === 'it' ? 'Torna agli eventi' : 'Back to events'}
				event={event}
				locale={locale}
			/>
			<EventContentSection event={event} locale={locale} />
			{event.showProgram && (
				<EventProgramSection locale={locale} subEventGroups={subEventGroups} />
			)}
		</div>
	);
}

export default async function ParentEventPage({
	params,
}: ParentEventPageProps) {
	const { locale, slug } = await params;
	setRequestLocale(locale);

	return (
		<Suspense>
			<ParentEventContent locale={locale} slug={slug} />
		</Suspense>
	);
}
