import type { Event, Image as ImageType } from '@payload-types';
import { Link } from '@/i18n/routing';
import { CustomImage } from '@/modules/components/CustomImage';
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
	const image = event.coverImage ? (event.coverImage as ImageType) : null;
	const bookingLabel = event.bookingLabel || 'Eventbrite';

	return (
		<section className='px-5 pt-10 pb-10 lg:px-10 xl:px-20'>
			<Link
				aria-label={backLabel}
				className='mb-8 flex size-[45px] items-center justify-center rounded-[14px] border-2 border-black transition-colors hover:bg-black/5'
				href={backHref}
			>
				<svg
					aria-hidden='true'
					className='-rotate-90'
					fill='none'
					height='20'
					viewBox='0 0 20 20'
					width='20'
				>
					<path d='M10 4L16 12H4L10 4Z' fill='currentColor' />
				</svg>
			</Link>

			<div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
				{/* Cover Image */}
				{image && (
					<div className='aspect-[4/3] overflow-hidden rounded-[30px]'>
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
				<div className='flex flex-col justify-center gap-6'>
					<h1 className='font-tagada text-5xl tracking-wide lg:text-7xl'>
						{event.title}
					</h1>

					{event.organizer && (
						<p className='font-greed text-lg font-bold uppercase tracking-wider'>
							{event.organizer}
						</p>
					)}

					{event.bookingUrl && (
						<a
							className='inline-flex w-fit items-center justify-center rounded-full bg-rosso-500 px-8 py-4 font-greed text-lg font-bold uppercase tracking-wider text-white transition-colors hover:bg-rosso-500/90'
							href={event.bookingUrl}
							rel='noopener noreferrer'
							target='_blank'
						>
							{bookingLabel}
						</a>
					)}

					<EventLinks links={event.links} locale={locale} />
				</div>
			</div>
		</section>
	);
}
