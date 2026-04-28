import type { Event } from '@payload-types';
import { getTranslations } from 'next-intl/server';
import { BlockRenderer } from '@/modules/blocks/BlockRenderer';
import { formatEventDateTime } from '../utils';

interface EventContentSectionProps {
	event: Event;
	locale: string;
}

export async function EventContentSection({
	event,
	locale,
}: EventContentSectionProps) {
	const t = await getTranslations('events');
	const startDateTime = formatEventDateTime(event.when.startDate, locale);
	const endDateTime = formatEventDateTime(event.when.endDate, locale);
	const isMultiDay = startDateTime.date !== endDateTime.date;

	return (
		<section className='px-5 py-15 md:py-20 lg:px-10 xl:px-20'>
			<div className='grid md:pl-30  md:pr-20 grid-cols-1 gap-8 lg:grid-cols-[3fr_2fr]'>
				{/* Left: Content blocks */}
				<div className='min-w-0'>
					{event.content && event.content.length > 0 && (
						<>
							<h2 className='mb-4 font-greed text-4xl font-bold'>
								{t('overviewHeading')}
							</h2>
							<div className='flex flex-col gap-6'>
								{event.content.map((block) => (
									<BlockRenderer block={block} key={block.id} />
								))}
							</div>
						</>
					)}
				</div>

				{/* Right: Date + Location sidebar */}
				<div className='flex flex-col min-w-0 items-start md:items-end gap-4 md:gap-8'>
					<div className='space-y-8 md:space-y-20'>
						{/* Date/Time */}
						<div>
							<div className='mb-2 w-fit px-1 font-bold bg-rosso-500'>
								{t('when')}
							</div>
							<p className='font-ghost text-2xl md:text-4xl varW600 uppercase tracking-wide'>
								{startDateTime.date} {startDateTime.time}
							</p>
							<p className='font-ghost text-2xl md:text-4xl varW600 uppercase tracking-wide'>
								— {isMultiDay && `${endDateTime.date} `}
								{endDateTime.time}
							</p>
						</div>

						{/* Location */}
						{event.address?.location && (
							<div>
								<div className='mb-2 w-fit px-1 font-bold bg-rosso-500'>
									{t('where')}
								</div>
								{event.address.googleMapsUrl ? (
									<a
										className='font-ghost text-2xl md:text-4xl varW600 hover:no-underline underline decoration-1 underline-offset-4 uppercase tracking-wide'
										href={event.address.googleMapsUrl}
										rel='noopener noreferrer'
										target='_blank'
									>
										{event.address.location}
									</a>
								) : (
									<p className='font-ghost text-2xl md:text-4xl varW600 uppercase tracking-wide'>
										{event.address.location}
									</p>
								)}
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}

export function EventContent2Section({
	event,
}: Pick<EventContentSectionProps, 'event'>) {
	if (!event.content2 || event.content2.length === 0) {
		return null;
	}

	return (
		<section className='px-5 pb-15 md:pb-20 lg:px-10 xl:px-20'>
			<div className='grid md:pl-30 md:pr-20 grid-cols-1 gap-8 lg:grid-cols-[3fr_2fr]'>
				<div className='min-w-0'>
					<div className='flex flex-col gap-6'>
						{event.content2.map((block) => (
							<BlockRenderer block={block} key={block.id} />
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
