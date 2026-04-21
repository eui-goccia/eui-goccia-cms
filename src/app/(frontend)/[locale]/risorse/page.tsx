import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { Suspense } from 'react';
import type { Locales } from '@/i18n/routing';
import { RisorseContent } from '@/modules/components/risorse/RisorseContent';
import { RISORSE_ENABLED } from '@/modules/features/risorse';
import {
	getResourceListingData,
	normalizeResourceSearchParams,
} from '@/modules/resources/queries';

function RisorseFallback() {
	return (
		<section className='px-3 pt-2 pb-20 md:px-5'>
			<div className='relative overflow-hidden rounded-[28px] bg-blu-500 px-6 pt-6 pb-3 md:px-10 md:pt-10'>
				<div className='h-[clamp(2.5rem,13vw,12.5rem)] w-full animate-pulse rounded-[20px] bg-blu-300/35' />
			</div>

			<div className='mt-3 hidden rounded-[10px] bg-rosso-500 px-5 py-3 md:px-7 lg:block'>
				<div className='h-5 w-full animate-pulse rounded bg-black/10' />
			</div>

				<div className='px-5 pt-2 md:px-7 lg:pt-6'>
					<div className='space-y-4 lg:pl-[260px]'>
					{Array.from({ length: 4 }).map((_, index) => (
						<div
							className='h-24 animate-pulse rounded-[16px] bg-black/8'
							// biome-ignore lint/suspicious/noArrayIndexKey: static fallback list
							key={index}
						/>
					))}
				</div>
			</div>
		</section>
	);
}

async function RisorseListing({
	locale,
	searchParams,
}: {
	locale: Locales;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const [{ isEnabled: draft }, resolvedSearchParams] = await Promise.all([
		draftMode(),
		searchParams,
	]);
	const filters = normalizeResourceSearchParams(resolvedSearchParams);
	const listingData = await getResourceListingData({
		draft,
		filters,
		locale,
	});

	return <RisorseContent {...listingData} />;
}

export default async function Risorse({
	params,
	searchParams,
}: {
	params: Promise<{ locale: string }>;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	if (!RISORSE_ENABLED) {
		notFound();
	}

	const { locale } = await params;
	setRequestLocale(locale);

	return (
		<main className='min-h-screen bg-blu-300 pt-20'>
			<Suspense fallback={<RisorseFallback />}>
				<RisorseListing
					locale={locale as Locales}
					searchParams={searchParams}
				/>
			</Suspense>
		</main>
	);
}
