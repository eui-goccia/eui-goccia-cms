import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import type { PaginatedDocs } from 'payload';
import { Suspense } from 'react';
import localization from '@/i18n/localization';
import type { Locale, Locales } from '@/i18n/routing';
import { ResourceDetail } from '@/modules/components/risorse/ResourceDetail';
import { RISORSE_ENABLED } from '@/modules/features/risorse';
import type { Resource } from '@/modules/payload/payload-types';
import { getResolvedResourceBySlug } from '@/modules/resources/queries';
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

	return (
		<Suspense fallback={<ResourceDetailSkeleton />}>
			<ResourcePageContent locale={locale} slug={slug} />
		</Suspense>
	);
}

function ResourceDetailSkeleton() {
	return (
		<div className='min-h-screen bg-blu-300 pt-16'>
			<div className='px-5 pt-12 pb-24 md:px-10 lg:px-16'>
				<div className='animate-pulse space-y-8'>
					<div className='h-12 w-12 rounded-[14px] bg-black/8' />
					<div className='h-16 max-w-3xl rounded bg-black/8' />
					<div className='h-8 max-w-xl rounded bg-black/8' />
					<div className='h-[420px] rounded-[10px] bg-black/8' />
				</div>
			</div>
		</div>
	);
}

async function ResourcePageContent({
	locale,
	slug,
}: {
	locale: Locale;
	slug: string;
}) {
	const { isEnabled: draft } = await draftMode();
	const resource = await getResolvedResourceBySlug({
		draft,
		locale: locale as Locales,
		slug,
	});

	if (!resource) {
		notFound();
	}

	return (
		<div className='min-h-screen bg-blu-300 pt-16'>
			<ResourceDetail locale={locale} resource={resource} />
		</div>
	);
}
