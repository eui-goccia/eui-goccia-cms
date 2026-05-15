import type { ReactNode } from 'react';
import { Suspense } from 'react';
import type { Locale } from '@/i18n/routing';
import { LivePreviewListener } from '@/modules/components/LivePreviewListener';
import Footer from '@/modules/components/shared/Footer';
import Header from '@/modules/components/shared/Header';
import NewsletterSignup from '@/modules/components/shared/NewsletterSignup';

export default async function PreviewLayout({
	children,
	params,
}: {
	children: ReactNode;
	params: Promise<{ locale: Locale }>;
}) {
	const { locale } = await params;

	return (
		<>
			<LivePreviewListener />
			<Suspense fallback={<div className='h-16 bg-rosa-300' />}>
				<Header />
			</Suspense>
			<main className='mb-auto bg-blu-300'>
				<Suspense fallback={null}>{children}</Suspense>
			</main>
			<Suspense
				fallback={
					<div className='w-full bg-rosa-300 min-h-55 px-5 lg:px-10 animate-pulse' />
				}
			>
				<NewsletterSignup locale={locale} />
			</Suspense>
			<Suspense fallback={<div className='bg-black min-h-40 animate-pulse' />}>
				<Footer locale={locale} />
			</Suspense>
		</>
	);
}
