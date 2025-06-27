import GridSection from '@/modules/components/GridSection';
import MapGocciaOverview from '@/modules/components/maps/MapGocciaOverview';

export default function SectionMap() {
	return (
		<GridSection sectionTitle="l'area di trasformazione">
			<div className='col-span-full h-[75dvh]'>
				<MapGocciaOverview />
			</div>
		</GridSection>
	);
}
