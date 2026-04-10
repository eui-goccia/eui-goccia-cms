import type { Event, Image as ImageType } from '@payload-types';
import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { getEventHref } from '@/modules/events/paths';
import { CustomImage } from './CustomImage';

interface EventCardProps {
	event: Event;
	showImage?: boolean;
}

function formatEventDate(timestamp: string, locale: string): string {
	const date = new Date(timestamp);
	return date.toLocaleDateString(locale === 'it' ? 'it-IT' : 'en-GB', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	});
}

export default async function EventCard({
	event,
	showImage = true,
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

	return (
		<Link
			className='group flex flex-col gap-2'
			href={eventHref}
			locale={locale}
		>
			{showImage && image ? (
				<div className='aspect-video overflow-hidden rounded-4xl'>
					<CustomImage
						alt={image.alt || event.title}
						className='object-cover rounded-4xl transition-transform duration-500 group-hover:scale-105'
						image={image}
						size='large'
						sizes='(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw'
					/>
				</div>
			) : null}

			<div className='flex px-1 items-center justify-between gap-0'>
				<p className='font-greed text-base font-bold uppercase '>
					{event.when.startDate
						? formatEventDate(event.when.startDate, locale)
						: '—'}
				</p>
				<p className='font-greed text-base font-bold uppercase '>
					{event.address?.location ?? ''}
				</p>
			</div>

			<h3 className='font-tagada px-1 text-3xl leading-tight tracking-wide lg:text-4xl'>
				{event.title}
			</h3>

			{event.description && (
				<>
					<p className='line-clamp-3 px-1 font-greed text-sm leading-relaxed'>
						{event.description}
					</p>
					<p className='font-greed px-1 text-sm font-bold uppercase tracking-wider underline decoration-1 underline-offset-4 transition-colors group-hover:text-rosso-500'>
						{t('discoverMore')}
					</p>
				</>
			)}
		</Link>
	);
}
