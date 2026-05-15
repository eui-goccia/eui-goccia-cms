import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import type { PaginatedDocs } from 'payload';
import localization from '@/i18n/localization';
import type { Locale, Locales } from '@/i18n/routing';
import { RISORSE_ENABLED } from '@/modules/features/risorse';
import type { Resource } from '@/modules/payload/payload-types';
import { ResourcePageContent } from '@/modules/resources/ResourcePageContent';
import { getDocuments } from '@/modules/utilities/getDocument';

export function generateStaticParams() {
	return Promise.allSettled(
		localization.locales.map((localeConfig) =>
			getDocuments({
				collection: 'resources',
				depth: 0,
				draft: false,
				limit: 100,
				locale: localeConfig.code as Locales,
				sort: 'createdAt',
			})
		)
	).then((results) => {
		const slugSet = new Set<string>();

		for (const result of results) {
			if (result.status !== 'fulfilled') {
				continue;
			}

			for (const resource of (result.value as PaginatedDocs<Resource>).docs) {
				if (resource.slug) {
					slugSet.add(resource.slug);
				}
			}
		}

		const slugs = Array.from(slugSet).map((slug) => ({ slug }));

		return slugs.length > 0 ? slugs : [{ slug: '_placeholder' }];
	});
}

export default async function ResourcePage({
	params,
}: {
	params: Promise<{ slug: string; locale: Locale }>;
}) {
	if (!RISORSE_ENABLED) {
		notFound();
	}

	const { locale, slug } = await params;
	setRequestLocale(locale);

	return <ResourcePageContent draft={false} locale={locale} slug={slug} />;
}
