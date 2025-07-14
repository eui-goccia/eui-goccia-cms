import type { Progetto } from '@payload-types';
import type { Locales } from '@/i18n/routing';
import { getCachedGlobal } from '@/modules/utilities/getGlobals';
import ProgettoClient from './page.client';

export const dynamic = 'force-static';
// Longer revalidation since content rarely changes
export const revalidate = 3600; // 1 hour

interface ProgettoPageProps {
	params: Promise<{ locale: string }>;
}

export default async function ProgettoPage({ params }: ProgettoPageProps) {
	const { locale } = await params;
	const project: Progetto = await getCachedGlobal(
		'progetto',
		1,
		locale as Locales
	);

	return <ProgettoClient project={project} />;
}
