import type { Event } from '@payload-types';
import { BlockRenderer } from '@/modules/blocks/BlockRenderer';
import { formatEventDateTime } from '../utils';

interface EventContentSectionProps {
	event: Event;
	locale: string;
}

export function EventContentSection({
	event,
	locale,
}: EventContentSectionProps) {
	const startDateTime = formatEventDateTime(event.when.startDate, locale);
	const endDateTime = formatEventDateTime(event.when.endDate, locale);

	return (
		<section className='px-5 pb-16 lg:px-10 xl:px-20'>
			<div className='grid grid-cols-1 gap-8 lg:grid-cols-[3fr_2fr]'>
				{/* Left: Content blocks */}
				<div>
					<h2 className='mb-6 font-greed text-lg font-bold uppercase tracking-wider'>
						{locale === 'it' ? 'PANORAMICA EVENTO' : 'EVENT OVERVIEW'}
					</h2>
					{event.content && event.content.length > 0 && (
						<div className='flex flex-col gap-6'>
							{event.content.map((block) => (
								<BlockRenderer block={block} key={block.id} />
							))}
						</div>
					)}
				</div>

				{/* Right: Date + Location sidebar */}
				<div className='flex flex-col gap-8'>
					{/* Date/Time */}
					<div>
						<div className='mb-2 size-3 bg-rosso-500' />
						<p className='font-ghost text-2xl uppercase tracking-wide'>
							{startDateTime.date}
						</p>
						<p className='font-ghost text-2xl uppercase tracking-wide'>
							{startDateTime.time} — {endDateTime.time}
						</p>
					</div>

					{/* Location */}
					{event.address?.location && (
						<div>
							<div className='mb-2 size-3 bg-rosso-500' />
							{event.address.googleMapsUrl ? (
								<a
									className='font-ghost text-2xl uppercase tracking-wide underline transition-colors hover:text-rosso-500'
									href={event.address.googleMapsUrl}
									rel='noopener noreferrer'
									target='_blank'
								>
									{event.address.location}
								</a>
							) : (
								<p className='font-ghost text-2xl uppercase tracking-wide'>
									{event.address.location}
								</p>
							)}
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
