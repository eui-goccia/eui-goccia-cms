import type { Home, Image } from '@payload-types';
import { getTranslations } from 'next-intl/server';
import CellData from '@/modules/components/CellData';
import CellVisual from '@/modules/components/CellVisual';
import GridRow from '@/modules/components/GridRow';
import GridSection from '@/modules/components/GridSection';

type What = NonNullable<Home['what']>[number];

export default async function SectionWhat({ home }: { home: Home }) {
	const what = home.what as What[];
	const t = await getTranslations();

	if (!what || what.length === 0 || !what[0]?.image) {
		return null;
	}

	return (
		<GridSection sectionTitle={t('what_we_do')}>
			<GridRow invertOrder={true}>
				<CellVisual
					srcImage={what[0].image as Image}
					altContent={(what[0].image as Image).alt}
					credits={(what[0].image as Image).caption}
				/>
				<CellData data={what[0].data} caption={what[0].caption} />
			</GridRow>

			<GridRow>
				<CellData
					caption={what[1].caption}
					captionClass='font-tagada normal-case xl:text-6xl md:text-5xl sm:text-4xl text-3xl'
				/>
				<CellVisual
					srcImage={what[1].image as Image}
					altContent={(what[1].image as Image).alt}
					credits={(what[1].image as Image).caption}
				/>
			</GridRow>

			<GridRow invertOrder={true}>
				<CellVisual
					srcImage={what[2].image as Image}
					altContent={(what[2].image as Image).alt}
					credits={(what[2].image as Image).caption}
				/>
				<CellData
					caption={what[2].caption}
					captionClass='font-tagada normal-case xl:text-6xl md:text-5xl sm:text-4xl text-3xl'
				/>
			</GridRow>
		</GridSection>
	);
}
