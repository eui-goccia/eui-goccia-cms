import { draftMode } from 'next/headers';
import { setRequestLocale } from 'next-intl/server';
import { Suspense } from 'react';
import { redirect } from '@/i18n/routing';
import { EventDetailSkeleton } from '@/modules/components/skeletons/EventDetailSkeleton';
import { EventDetailContent } from '@/modules/events/detail';

interface EventPreviewPageProps {
	params: Promise<{ locale: string; segments: string[] }>;
}

export default function EventPreviewPage({ params }: EventPreviewPageProps) {
	return (
		<Suspense fallback={<EventDetailSkeleton />}>
			<EventPreviewContent params={params} />
		</Suspense>
	);
}

async function EventPreviewContent({
	params,
}: {
	params: EventPreviewPageProps['params'];
}) {
	const { locale, segments } = await params;
	setRequestLocale(locale);

	const { isEnabled } = await draftMode();

	if (!isEnabled) {
		redirect({ href: `/eventi/${segments.join('/')}`, locale });
	}

	return <EventDetailContent draft locale={locale} segments={segments} />;
}
