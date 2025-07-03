import type { Metadata } from 'next';
import { ghost, greed, tagada } from '@/modules/utilities/customFonts';
import '@/app/(frontend)/[locale]/global.css';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import type { TypedLocale } from 'payload';
import { routing } from '@/i18n/routing';
import { Plausible } from '@/modules/analytics/plausible';
import { LivePreviewListener } from '@/modules/components/LivePreviewListener';
import Footer from '@/modules/components/shared/Footer';
import Header from '@/modules/components/shared/Header';
import NewsletterSignup from '@/modules/components/shared/NewsletterSignup';
import { cn } from '@/modules/utilities/cnUtils';
import { ReactLenis } from '@/modules/utilities/lenis';

export const metadata: Metadata = {
	title: 'EUI Goccia',
	description:
		"Un progetto di rigenerazione urbana per il recupero dell'ex area industriale della Goccia, nell’area Nord Ovest di Milano, attraverso le Nature Based Solutions.",
	keywords: [
		'EUI',
		'Goccia',
		'Milano',
		'Bovisa',
		'Nature Based Solutions',
		'Soil Health',
	],
	authors: [{ name: 'EUI Goccia Team' }],
	creator: 'EUI Goccia Team',
	publisher: 'EUI Goccia Team',
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	openGraph: {
		type: 'website',
		locale: 'it_IT',
		url: 'https://eui-goccia.eu',
		title: 'EUI Goccia',
		description:
			"Un progetto di rigenerazione urbana per il recupero dell'ex area industriale della Goccia, nell’area Nord Ovest di Milano, attraverso le Nature Based Solutions.",
		siteName: 'EUI Goccia',
		images: [
			{
				url: '/og-image.jpg',
				width: 1200,
				height: 675,
				alt: 'EUI Goccia',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'EUI Goccia',
		description:
			"Un progetto di rigenerazione urbana per il recupero dell'ex area industriale della Goccia, nell’area Nord Ovest di Milano, attraverso le Nature Based Solutions.",
		images: ['/og-image.jpg'],
	},
	icons: {
		icon: '/favicon.ico',
		shortcut: '/favicon-96x96.png',
		apple: '/apple-touch-icon.png',
	},
	manifest: '/site.webmanifest',
	metadataBase: new URL('https://eui-goccia.eu'),
};

type Args = {
	children: React.ReactNode;
	params: Promise<{
		locale: TypedLocale;
	}>;
};

export default async function RootLayout({ children, params }: Readonly<Args>) {
	const { locale } = await params;

	if (!routing.locales.includes(locale as TypedLocale)) {
		notFound();
	}
	setRequestLocale(locale);
	const messages = await getMessages();

	return (
		<html lang={locale} className='scroll-smooth'>
			<Plausible>
				<NextIntlClientProvider messages={messages}>
					<ReactLenis root>
						<LivePreviewListener />
						<body
							className={cn(
								ghost.variable,
								tagada.variable,
								greed.variable,
								'antialiased flex flex-col justify-between h-dvh'
							)}
						>
							<Header />
							<main className='mb-auto'>{children}</main>
							<NewsletterSignup />
							<Footer />
						</body>
					</ReactLenis>
				</NextIntlClientProvider>
			</Plausible>
		</html>
	);
}
