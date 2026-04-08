import { setRequestLocale } from 'next-intl/server';
import type { PaginatedDocs } from 'payload';
import { Suspense } from 'react';
import localization from '@/i18n/localization';
import type { Locales } from '@/i18n/routing';
import { EventDetailContent } from '@/modules/events/detail';
import type { Event } from '@/modules/payload/payload-types';
import { getDocuments } from '@/modules/utilities/getDocument';

const LEADING_SLASH_PATTERN = /^\//;

interface NestedEventPageProps {
	params: Promise<{ locale: string; segments: string[] }>;
}

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
				if (!lastBreadcrumb?.url) {
					continue;
				}

				const segments = lastBreadcrumb.url
					.replace(LEADING_SLASH_PATTERN, '')
					.split('/');
				if (segments.length > 2) {
					paramSet.add(JSON.stringify({ segments }));
				}
			}
		} catch {
			// Build-time static param generation may fail
		}
	}

	const params = Array.from(paramSet).map((param) => JSON.parse(param));

	return params.length > 0 ? params : [{ segments: ['_placeholder'] }];
}

export default async function NestedEventPage({
	params,
}: NestedEventPageProps) {
	const { locale, segments } = await params;
	setRequestLocale(locale);

	return (
		<Suspense>
			<EventDetailContent locale={locale} segments={segments} />
		</Suspense>
	);
}
