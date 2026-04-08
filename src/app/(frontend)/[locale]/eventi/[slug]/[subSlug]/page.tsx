import { setRequestLocale } from 'next-intl/server';
import type { PaginatedDocs } from 'payload';
import { Suspense } from 'react';
import localization from '@/i18n/localization';
import type { Locales } from '@/i18n/routing';
import { EventDetailContent } from '@/modules/events/detail';
import type { Event } from '@/modules/payload/payload-types';
import { getDocuments } from '@/modules/utilities/getDocument';

const LEADING_SLASH_PATTERN = /^\//;

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
					const parts = lastBreadcrumb.url
						.replace(LEADING_SLASH_PATTERN, '')
						.split('/');
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

export default async function SubEventPage({ params }: SubEventPageProps) {
	const { locale, slug, subSlug } = await params;
	setRequestLocale(locale);

	return (
		<Suspense>
			<EventDetailContent locale={locale} segments={[slug, subSlug]} />
		</Suspense>
	);
}
