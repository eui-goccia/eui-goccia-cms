import { getTranslations } from 'next-intl/server';
import GridSection from '@/modules/components/GridSection';
import MapGocciaOverview from '@/modules/components/maps/MapGocciaOverview';

export default async function SectionMap() {
	const t = await getTranslations();
	return (
		<GridSection sectionTitle={t('transformation_area')}>
			<div className='col-span-full h-[75dvh]'>
				<MapGocciaOverview />
			</div>
		</GridSection>
	);
}
