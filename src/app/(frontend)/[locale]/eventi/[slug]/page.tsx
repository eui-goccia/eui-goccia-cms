import { setRequestLocale } from 'next-intl/server';
import type { PaginatedDocs } from 'payload';
import { Suspense } from 'react';
import localization from '@/i18n/localization';
import type { Locales } from '@/i18n/routing';
import { EventDetailContent } from '@/modules/events/detail';
import type { Event } from '@/modules/payload/payload-types';
import { getDocuments } from '@/modules/utilities/getDocument';

const LEADING_SLASH_PATTERN = /^\//;

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
					const slug = lastBreadcrumb.url.replace(LEADING_SLASH_PATTERN, '');
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

export default async function ParentEventPage({
	params,
}: ParentEventPageProps) {
	const { locale, slug } = await params;
	setRequestLocale(locale);

	return (
		<Suspense>
			<EventDetailContent locale={locale} segments={[slug]} />
		</Suspense>
	);
}
