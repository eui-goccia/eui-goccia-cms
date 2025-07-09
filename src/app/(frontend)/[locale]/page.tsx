import type { Home as HomeType } from '@payload-types';
import { getLocale } from 'next-intl/server';
import type { Locales } from '@/i18n/routing';
import SectionForest from '@/modules/components/home/SectionForest';
import SectionHero from '@/modules/components/home/SectionHero';
import SectionIntroText from '@/modules/components/home/SectionIntroText';
import SectionMap from '@/modules/components/home/SectionMap';
import SectionWhat from '@/modules/components/home/SectionWhat';
import SectionBreakStroke from '@/modules/components/shared/SectionBreakStroke';
import { getCachedGlobal } from '@/modules/utilities/getGlobals';

export default async function Home() {
	const locale = (await getLocale()) as Locales;
	const home = (await getCachedGlobal('home', 2, locale)) as HomeType;
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
