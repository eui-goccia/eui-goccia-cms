import { notFound } from 'next/navigation';
import type { Locale, Locales } from '@/i18n/routing';
import { ResourceDetail } from '@/modules/components/risorse/ResourceDetail';
import { getResolvedResourceBySlug } from '@/modules/resources/queries';

export async function ResourcePageContent({
	draft = false,
	locale,
	slug,
}: {
	draft?: boolean;
	locale: Locale;
	slug: string;
}) {
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
