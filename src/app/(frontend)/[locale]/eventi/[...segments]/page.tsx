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
		<Suspense
			fallback={
				<div className='min-h-screen bg-blu-300 animate-pulse px-5 pt-24 lg:px-10'>
					<div className='h-8 bg-gray-200 rounded w-1/4 mb-8' />
					<div className='aspect-4/3 max-w-2xl bg-gray-200 rounded-[30px]' />
				</div>
			}
		>
			<EventDetailContent locale={locale} segments={segments} />
		</Suspense>
	);
}
