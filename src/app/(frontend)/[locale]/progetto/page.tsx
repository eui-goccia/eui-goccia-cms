import type { Progetto } from '@payload-types';
import { getLocale } from 'next-intl/server';
import type { Locales } from '@/i18n/routing';
import { getCachedGlobal } from '@/modules/utilities/getGlobals';
import ProgettoClient from './page.client';

export default async function ProgettoPage() {
	const locale: Locales = (await getLocale()) as Locales;
	const project: Progetto = await getCachedGlobal('progetto', 1, locale);

	return <ProgettoClient project={project} />;
}
