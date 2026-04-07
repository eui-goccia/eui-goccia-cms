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
import { getDocuments } from '@/modules/utilities/getDocument';

export async function generateStaticParams() {
	const paramSet = new Set<string>();

	for (const localeConfig of localization.locales) {
		const locale = localeConfig.code as Locales;

		try {
			const events = (await getDocuments({
				collection: 'events',
				depth: 0,
				limit: 100,
				draft: false,
				locale,
				sort: 'createdAt',
			})) as PaginatedDocs<Event>;

			for (const event of events.docs) {
				const lastBreadcrumb = event.breadcrumbs?.at(-1);
				if (lastBreadcrumb?.url) {
					const parts = lastBreadcrumb.url.replace(/^\//, '').split('/');
					if (parts.length === 2) {
						paramSet.add(JSON.stringify({ slug: parts[0], subSlug: parts[1] }));
					}
				}
			}
		} catch {
			// Build-time static param generation may fail
		}
	}

	const params = Array.from(paramSet).map((p) => JSON.parse(p));

	return params.length > 0
		? params
		: [{ slug: '_placeholder', subSlug: '_placeholder' }];
}

interface SubEventPageProps {
	params: Promise<{ locale: string; slug: string; subSlug: string }>;
}

async function SubEventContent({
	locale,
	slug,
	subSlug,
}: {
	locale: string;
	slug: string;
	subSlug: string;
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
			'breadcrumbs.url': { equals: `/${slug}/${subSlug}` },
		},
	});

	const event = events.docs.find((doc) => {
		const lastBreadcrumb = doc.breadcrumbs?.at(-1);
		return lastBreadcrumb?.url === `/${slug}/${subSlug}`;
	});
	if (!event) {
		notFound();
	}

	return (
		<div className='min-h-screen bg-blu-300'>
			<EventHero
				backHref={`/eventi/${slug}`}
				backLabel={locale === 'it' ? "Torna all'evento" : 'Back to event'}
				event={event}
				locale={locale}
			/>
			<EventContentSection event={event} locale={locale} />
		</div>
	);
}

export default async function SubEventPage({ params }: SubEventPageProps) {
	const { locale, slug, subSlug } = await params;
	setRequestLocale(locale);

	return (
		<Suspense>
			<SubEventContent locale={locale} slug={slug} subSlug={subSlug} />
		</Suspense>
	);
}
