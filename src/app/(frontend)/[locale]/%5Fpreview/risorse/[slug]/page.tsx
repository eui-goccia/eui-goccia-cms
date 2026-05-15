import { draftMode } from 'next/headers';
import { setRequestLocale } from 'next-intl/server';
import { Suspense } from 'react';
import type { Locale } from '@/i18n/routing';
import { redirect } from '@/i18n/routing';
import { ResourcePageContent } from '@/modules/resources/ResourcePageContent';

interface ResourcePreviewPageProps {
	params: Promise<{ locale: Locale; slug: string }>;
}

export default function ResourcePreviewPage({
	params,
}: ResourcePreviewPageProps) {
	return (
		<Suspense fallback={<ResourceDetailSkeleton />}>
			<ResourcePreviewContent params={params} />
		</Suspense>
	);
}

async function ResourcePreviewContent({
	params,
}: {
	params: ResourcePreviewPageProps['params'];
}) {
	const { locale, slug } = await params;
	setRequestLocale(locale);

	const { isEnabled } = await draftMode();

	if (!isEnabled) {
		redirect({ href: `/risorse/${slug}`, locale });
	}

	return <ResourcePageContent draft locale={locale} slug={slug} />;
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
