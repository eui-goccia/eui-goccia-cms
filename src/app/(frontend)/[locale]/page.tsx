import SectionForest from '@/modules/components/home/SectionForest';
import SectionHero from '@/modules/components/home/SectionHero';
import SectionIntroText from '@/modules/components/home/SectionIntroText';
import SectionMap from '@/modules/components/home/SectionMap';
import SectionWhat from '@/modules/components/home/SectionWhat';
import SectionBreakStroke from '@/modules/components/shared/SectionBreakStroke';

export default function Home() {
	return (
		<main className='mb-auto'>
			<SectionHero />
			<SectionIntroText />

			<div>
				<SectionForest />
				<SectionWhat />
				<SectionMap />
			</div>

			<SectionBreakStroke />
		</main>
	);
}
