import img6 from '@public/images/homepage/home_6.webp';
import img7 from '@public/images/homepage/home_7.webp';
import img8 from '@public/images/homepage/home_8.webp';
import CellData from '@/modules/components/CellData';
import CellVisual from '@/modules/components/CellVisual';
import GridRow from '@/modules/components/GridRow';
import GridSection from '@/modules/components/GridSection';

export default function SectionWhat() {
	return (
		<GridSection sectionTitle='cosa facciamo'>
			<GridRow invertOrder={true}>
				<CellVisual srcImage={img6} altContent='' />
				<CellData
					data='5 ettari'
					caption='da bonificare tramite biorisanamento'
				/>
			</GridRow>

			<GridRow>
				<CellData
					caption='Recupero di un edificio industriale per attività di gestione forestale partecipate'
					captionClass='font-tagada normal-case xl:text-6xl md:text-5xl sm:text-4xl text-3xl'
				/>
				<CellVisual srcImage={img7} altContent='' />
			</GridRow>

			<GridRow invertOrder={true}>
				<CellVisual credits='©Terrapreta' srcImage={img8} altContent='' />
				<CellData
					caption='Percorso etnografico e costruzione di una governance interdisciplinare e partecipata'
					captionClass='font-tagada normal-case xl:text-6xl md:text-5xl sm:text-4xl text-3xl'
				/>
			</GridRow>
		</GridSection>
	);
}
