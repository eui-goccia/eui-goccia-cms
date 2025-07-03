import type { Progetto } from '@payload-types';
import { getCachedGlobal } from '@/modules/utilities/getGlobals';
import ProgettoClient from './page.client';

export default async function ProgettoPage() {
	const project: Progetto = await getCachedGlobal('progetto', 1);

	return <ProgettoClient project={project} />;
}
