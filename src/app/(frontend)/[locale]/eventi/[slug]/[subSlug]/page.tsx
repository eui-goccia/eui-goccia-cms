import configPromise from '@payload-config';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { getPayload } from 'payload';
import type { Locales } from '@/i18n/routing';
import { EventContentSection } from '@/modules/events/components/EventContentSection';
import { EventHero } from '@/modules/events/components/EventHero';

interface SubEventPageProps {
	params: Promise<{ locale: string; slug: string; subSlug: string }>;
}

export default async function SubEventPage({ params }: SubEventPageProps) {
	const { locale, slug, subSlug } = await params;
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
			/>
			<EventContentSection event={event} locale={locale} />
		</div>
	);
}
