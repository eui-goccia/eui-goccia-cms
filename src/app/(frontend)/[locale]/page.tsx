import type { Home as HomeType } from '@payload-types';
import { Suspense } from 'react';
import type { Locales } from '@/i18n/routing';
import SectionForest from '@/modules/components/home/SectionForest';
import SectionHero from '@/modules/components/home/SectionHero';
import SectionIntroText from '@/modules/components/home/SectionIntroText';
import SectionMap from '@/modules/components/home/SectionMap';
import SectionWhat from '@/modules/components/home/SectionWhat';
import SectionBreakStroke from '@/modules/components/shared/SectionBreakStroke';
import { SectionSkeleton } from '@/modules/components/skeletons/SectionSkeleton';
import { getGlobal } from '@/modules/utilities/getGlobals';

interface HomeProps {
	params: Promise<{ locale: string }>;
}

export default async function Home({ params }: HomeProps) {
	const { locale } = await params;
	const home = (await getGlobal('home', 2, locale as Locales)) as HomeType;

	return (
		<main className='mb-auto'>
			<SectionHero home={home} />
			<Suspense fallback={<SectionSkeleton />}>
				<SectionIntroText home={home} />
			</Suspense>

			<div>
				<Suspense fallback={<SectionSkeleton />}>
					<SectionForest home={home} />
				</Suspense>
				<Suspense fallback={<SectionSkeleton />}>
					<SectionWhat home={home} />
				</Suspense>
				<Suspense fallback={<SectionSkeleton />}>
					<SectionMap />
				</Suspense>
			</div>

			<SectionBreakStroke />
		</main>
	);
}
