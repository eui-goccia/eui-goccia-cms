import img2 from '@public/images/homepage/home_2.webp';
import img3 from '@public/images/homepage/home_3.webp';
import img5 from '@public/images/homepage/home_5.webp';
import CellData from '@/modules/components/CellData';
import CellVisual from '@/modules/components/CellVisual';
import GridRow from '@/modules/components/GridRow';
import GridSection from '@/modules/components/GridSection';

export default function SectionForest() {
	return (
		<GridSection sectionTitle='la foresta'>
			<GridRow>
				<CellData
					data='18 ettari'
					caption='di foresta spontanea da valorizzare'
				/>
				<CellVisual srcImage={img2} altContent='' />
			</GridRow>

			<GridRow invertOrder={true}>
				<CellVisual srcImage={img3} altContent='' />
				<CellData
					data='15.000+ alberi'
					caption='specie più presenti: robinia, bagolaro, pioppo'
				/>
			</GridRow>

			<GridRow>
				<CellData data='40 specie di avifauna' />
				<CellVisual credits='©Terrapreta' srcImage={img5} altContent='' />
			</GridRow>
		</GridSection>
	);
}
