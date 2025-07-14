import type { Home, Image } from '@payload-types';
import { getTranslations } from 'next-intl/server';
import CellData from '@/modules/components/CellData';
import CellVisual from '@/modules/components/CellVisual';
import GridRow from '@/modules/components/GridRow';
import GridSection from '@/modules/components/GridSection';

type Forest = NonNullable<Home['forest']>[number];

export default async function SectionForest({ home }: { home: Home }) {
	const forest = home.forest as Forest[];
	const t = await getTranslations();

	return (
		<GridSection sectionTitle={t('forest')}>
			<GridRow>
				<CellData data={forest[0].data} caption={forest[0].caption} />
				<CellVisual
					srcImage={forest[0].image as Image}
					altContent={(forest[0].image as Image).alt}
					credits={(forest[0].image as Image).caption}
				/>
			</GridRow>

			<GridRow invertOrder={true}>
				<CellVisual
					srcImage={forest[1].image as Image}
					altContent={(forest[1].image as Image).alt}
					credits={(forest[1].image as Image).caption}
				/>
				<CellData data={forest[1].data} caption={forest[1].caption} />
			</GridRow>

			<GridRow>
				<CellData data={forest[2].data} caption={forest[2].caption} />
				<CellVisual
					srcImage={forest[2].image as Image}
					altContent={(forest[2].image as Image).alt}
					credits={(forest[2].image as Image).caption}
				/>
			</GridRow>
		</GridSection>
	);
}
