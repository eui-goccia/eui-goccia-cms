import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import type { PaginatedDocs } from 'payload';
import type { Locales } from '@/i18n/routing';
import type { Event } from '@/modules/payload/payload-types';
import { getDocuments } from '@/modules/utilities/getDocument';

interface EventDetailPageProps {
	params: Promise<{ locale: string; slug: string[] }>;
}

export default async function EventDetailPage({
	params,
}: EventDetailPageProps) {
	const { locale, slug } = await params;
	const { isEnabled: draft } = await draftMode();

	const fullPath = `/${slug.join('/')}`;

	const events = (await getDocuments({
		collection: 'events',
		depth: 2,
		draft,
		locale: locale as Locales,
		where: {
			'breadcrumbs.url': { equals: fullPath },
		},
	})) as PaginatedDocs<Event>;

	const event = events.docs[0];
	if (!event) {
		notFound();
	}

	return (
		<div>
			<h1>{event.title}</h1>
		</div>
	);
}
