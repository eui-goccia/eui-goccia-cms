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
				<CellData caption={forest[0].caption} data={forest[0].data} />
				<CellVisual
					altContent={(forest[0].image as Image).alt}
					credits={(forest[0].image as Image).caption}
					srcImage={forest[0].image as Image}
				/>
			</GridRow>

			<GridRow invertOrder={true}>
				<CellVisual
					altContent={(forest[1].image as Image).alt}
					credits={(forest[1].image as Image).caption}
					srcImage={forest[1].image as Image}
				/>
				<CellData caption={forest[1].caption} data={forest[1].data} />
			</GridRow>

			<GridRow>
				<CellData caption={forest[2].caption} data={forest[2].data} />
				<CellVisual
					altContent={(forest[2].image as Image).alt}
					credits={(forest[2].image as Image).caption}
					srcImage={forest[2].image as Image}
				/>
			</GridRow>
		</GridSection>
	);
}
