import type { Event } from '@payload-types';
import EventCard from '@/modules/components/EventCard';
import { getLabelDisplayName } from '../labelDisplayNames';

interface EventProgramSectionProps {
	subEventGroups: Map<string, Event[]>;
	locale: string;
}

export function EventProgramSection({
	subEventGroups,
	locale,
}: EventProgramSectionProps) {
	if (subEventGroups.size === 0) {
		return null;
	}

	return (
		<section className='px-5 pb-16 lg:px-10 xl:px-20'>
			<div className='md:pl-30 md:pr-20'>
				<h2 className='mb-8 font-greed text-4xl font-bold'>
					{locale === 'it' ? 'Programma' : 'Program'}
				</h2>
				{Array.from(subEventGroups.entries()).map(([label, labelEvents]) => (
					<div className='mb-12 last:mb-0' key={label}>
						<h3 className='mb-4 bg-rosso-500 px-1 font-greed text-xl md:text-2xl font-bold'>
							{getLabelDisplayName(label, locale)}
						</h3>
						<div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
							{labelEvents.map((subEvent) => (
								<EventCard
									event={subEvent}
									key={subEvent.id}
									variant='compact'
								/>
							))}
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
