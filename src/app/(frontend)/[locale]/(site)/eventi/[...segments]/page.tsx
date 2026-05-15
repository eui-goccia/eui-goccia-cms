import { setRequestLocale } from 'next-intl/server';
import type { PaginatedDocs } from 'payload';
import localization from '@/i18n/localization';
import type { Locales } from '@/i18n/routing';
import { EventDetailContent } from '@/modules/events/detail';
import type { Event } from '@/modules/payload/payload-types';
import { getDocuments } from '@/modules/utilities/getDocument';

const LEADING_SLASH_PATTERN = /^\//;

interface EventPageProps {
	params: Promise<{ locale: string; segments: string[] }>;
}

export async function generateStaticParams() {
	const paramSet = new Set<string>();

	const results = await Promise.allSettled(
		localization.locales.map((localeConfig) =>
			getDocuments({
				collection: 'events',
				depth: 0,
				limit: 100,
				draft: false,
				locale: localeConfig.code as Locales,
				sort: 'createdAt',
			})
		)
	);

	for (const [i, result] of results.entries()) {
		if (result.status === 'rejected') {
			const localeCode = localization.locales[i].code;
			console.error(
				`[generateStaticParams] Failed to fetch events for locale "${localeCode}":`,
				result.reason
			);
			continue;
		}
		const events = result.value as PaginatedDocs<Event>;
		for (const event of events.docs) {
			const lastBreadcrumb = event.breadcrumbs?.at(-1);
			if (lastBreadcrumb?.url) {
				const segments = lastBreadcrumb.url
					.replace(LEADING_SLASH_PATTERN, '')
					.split('/')
					.filter(Boolean);

				if (segments.length > 0) {
					paramSet.add(JSON.stringify({ segments }));
				}
			}
		}
	}

	const params = Array.from(paramSet).map((p) => JSON.parse(p));

	return params.length > 0 ? params : [{ segments: ['_placeholder'] }];
}

export default async function EventPage({ params }: EventPageProps) {
	const { locale, segments } = await params;
	setRequestLocale(locale);

	return (
		<EventDetailContent draft={false} locale={locale} segments={segments} />
	);
}
