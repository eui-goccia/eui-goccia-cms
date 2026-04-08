import type { Event, Image as ImageType } from '@payload-types';
import { Link } from '@/i18n/routing';
import { CustomImage } from '@/modules/components/CustomImage';
import ArrowLeft from '@/modules/components/ui/arrow-left';
import { EventLinks } from './EventLinks';

interface EventHeroProps {
	event: Event;
	backHref: string;
	backLabel: string;
	locale: string;
}

export function EventHero({
	event,
	backHref,
	backLabel,
	locale,
}: EventHeroProps) {
	const image =
		event.coverImage && typeof event.coverImage !== 'string'
			? (event.coverImage as ImageType)
			: null;
	const bookingLabel = event.bookingLabel || 'Eventbrite';

	return (
		<section className='px-5 flex  pt-24 pb-10 lg:px-10 xl:px-20'>
			<div className='w-30'>
				<Link
					aria-label={backLabel}
					className='flex size-12 items-center justify-center rounded-[14px] border-2 border-black transition-colors hover:bg-black/5'
					href={backHref}
				>
					<ArrowLeft />
				</Link>
			</div>

			<div className='grid grid-cols-1 items-start gap-8 lg:grid-cols-2'>
				{/* Cover Image */}
				{image && (
					<div className='aspect-4/3 overflow-hidden rounded-[30px]'>
						<CustomImage
							alt={image.alt || event.title}
							className='object-cover rounded-[30px]'
							image={image}
							loading='eager'
							priority
							size='large'
						/>
					</div>
				)}

				{/* Title, Organizer, Booking, Links */}
				<div className='flex flex-col pt-1 justify-between h-full gap-1'>
					<div className='flex gap-1 flex-col'>
						<h1 className='font-tagada text-5xl tracking-wide lg:text-7xl'>
							{event.title}
						</h1>

						{event.organizer && (
							<p className='font-greed text-xl font-bold uppercase tracking-wider'>
								{event.organizer}
							</p>
						)}

						{event.bookingUrl && (
							<a
								className='inline-flex mt-4 w-fit items-center justify-center rounded-full bg-black px-6 py-3 font-greed text-md font-bold uppercase tracking-wider text-white transition-colors hover:bg-black/80'
								href={event.bookingUrl}
								rel='noopener noreferrer'
								target='_blank'
							>
								{bookingLabel}
							</a>
						)}
					</div>

					<EventLinks links={event.links} locale={locale} />
				</div>
			</div>
		</section>
	);
}
