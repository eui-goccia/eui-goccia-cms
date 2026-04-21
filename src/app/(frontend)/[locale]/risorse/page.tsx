import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import type { Locales } from '@/i18n/routing';
import { RisorseContent } from '@/modules/components/risorse/RisorseContent';
import { RISORSE_ENABLED } from '@/modules/features/risorse';
import {
	getResourceListingData,
	normalizeResourceSearchParams,
} from '@/modules/resources/queries';

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
	const { isEnabled: draft } = await draftMode();
	const filters = normalizeResourceSearchParams(await searchParams);
	const listingData = await getResourceListingData({
		draft,
		filters,
		locale: locale as Locales,
	});

	return (
		<main className='min-h-screen bg-blu-300 pt-20'>
			<RisorseContent {...listingData} />
		</main>
	);
}
