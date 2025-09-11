import type { Home as HomeType } from '@payload-types';
import type { Locales } from '@/i18n/routing';
import SectionForest from '@/modules/components/home/SectionForest';
import SectionHero from '@/modules/components/home/SectionHero';
import SectionIntroText from '@/modules/components/home/SectionIntroText';
import SectionMap from '@/modules/components/home/SectionMap';
import SectionWhat from '@/modules/components/home/SectionWhat';
import SectionBreakStroke from '@/modules/components/shared/SectionBreakStroke';
import { getCachedGlobal } from '@/modules/utilities/getGlobals';

export const dynamic = 'force-static';
// Longer revalidation since content rarely changes
export const revalidate = 3600; // 1 hour

type HomeProps = {
	params: Promise<{ locale: string }>;
};

export default async function Home({ params }: HomeProps) {
	const { locale } = await params;
	const home = (await getCachedGlobal(
		'home',
		2,
		locale as Locales
	)) as HomeType;

	return (
		<main className='mb-auto'>
			<SectionHero home={home} />
			<SectionIntroText home={home} />

			<div>
				<SectionForest home={home} />
				<SectionWhat home={home} />
				<SectionMap />
			</div>

			<SectionBreakStroke />
		</main>
	);
}
