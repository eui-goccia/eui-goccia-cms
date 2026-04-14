import type { Event, Image as ImageType } from '@payload-types';
import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { getEventHref } from '@/modules/events/paths';
import { formatEventDateTime } from '@/modules/events/utils';
import { CustomImage } from './CustomImage';

type EventCardVariant = 'default' | 'compact';

interface EventCardProps {
	event: Event;
	showImage?: boolean;
	variant?: EventCardVariant;
}

function formatEventDateLong(timestamp: string, locale: string): string {
	const date = new Date(timestamp);
	const loc = locale === 'it' ? 'it-IT' : 'en-GB';
	const dateLabel = date.toLocaleDateString(loc, {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	});
	const timeLabel = date.toLocaleTimeString(loc, {
		hour: '2-digit',
		minute: '2-digit',
		hour12: false,
	});
	return `${dateLabel} · ${timeLabel}`;
}

function getDateLabel(
	startDate: string | null | undefined,
	locale: string,
	isCompact: boolean
): string {
	if (!startDate) {
		return '—';
	}
	if (!isCompact) {
		return formatEventDateLong(startDate, locale);
	}
	const { date, time } = formatEventDateTime(startDate, locale);
	return `${date} · ${time}`;
}

export default async function EventCard({
	event,
	showImage = true,
	variant = 'default',
}: EventCardProps) {
	const [locale, t] = await Promise.all([
		getLocale(),
		getTranslations('events'),
	]);
	const image =
		event.coverImage && typeof event.coverImage !== 'string'
			? (event.coverImage as ImageType)
			: null;

	const eventHref = getEventHref(event);
	const isCompact = variant === 'compact';

	const wrapperClass = isCompact
		? 'group flex flex-col gap-2'
		: 'group flex flex-col group gap-5';
	const imageWrapperClass = isCompact
		? 'aspect-4/3 overflow-hidden rounded-[20px] bg-black/5'
		: 'aspect-4/5 overflow-hidden rounded-4xl';
	const imageClass = isCompact
		? 'object-cover rounded-[20px] transition-transform duration-500 group-hover:scale-105'
		: 'object-cover rounded-4xl transition-transform duration-500 group-hover:scale-105';
	const imageSize: 'medium' | 'large' = isCompact ? 'medium' : 'large';
	const imageSizes = isCompact
		? undefined
		: '(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw';

	const dateLabel = getDateLabel(event.when.startDate, locale, isCompact);

	return (
		<Link className={wrapperClass} href={eventHref} locale={locale}>
			{showImage && image ? (
				<div className={imageWrapperClass}>
					<CustomImage
						alt={image.alt || event.title}
						className={imageClass}
						image={image}
						size={imageSize}
						sizes={imageSizes}
					/>
				</div>
			) : null}

			{isCompact ? (
				<div className='flex justify-between px-1'>
					<p className='font-greed h-fit uppercase transition-colors duration-500 group-hover:bg-rosso-500 text-balance text-base font-bold '>
						{event.title}
					</p>
					<p className='font-greed h-fit uppercase transition-colors duration-500 group-hover:bg-rosso-500 text-base font-bold '>
						{dateLabel}
					</p>
				</div>
			) : (
				<div className='flex flex-col gap-2'>
					<div className='flex px-1 items-center justify-between gap-0'>
						<p className='font-greed h-fit transition-colors duration-500 group-hover:bg-rosso-500 text-base font-bold uppercase '>
							{dateLabel}
						</p>
						<p className='font-greed h-fit transition-colors duration-500 group-hover:bg-rosso-500 text-base font-bold uppercase '>
							{event.address?.location ?? ''}
						</p>
					</div>

					<hgroup className='flex flex-col gap-1'>
						<h3 className='font-tagada text-pretty px-1 text-3xl leading-tight tracking-wide lg:text-4xl'>
							{event.title}
						</h3>

						{event.description && (
							<p className='px-1 text-balance font-greed text-xl '>
								{event.description}
							</p>
						)}
					</hgroup>
				</div>
			)}
		</Link>
	);
}
