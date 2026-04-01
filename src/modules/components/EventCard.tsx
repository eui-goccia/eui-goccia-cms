import type { Event, Image as ImageType } from '@payload-types';
import { getLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
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
	const locale = await getLocale();
	const image = event.coverImage as ImageType;

	return (
		<Link
			className='group flex flex-col gap-3'
			href={`/eventi/${event.slug}`}
			locale={locale}
		>
			{showImage && image ? (
				<div className='aspect-[4/3] overflow-hidden rounded-[30px]'>
					<CustomImage
						alt={image.caption || event.title}
						className='object-cover rounded-[30px] transition-transform duration-500 group-hover:scale-105'
						image={image}
						size='large'
					/>
				</div>
			) : null}

			<div className='flex items-center justify-between gap-2'>
				<p className='font-greed text-lg font-bold uppercase tracking-wider underline decoration-rosso-500 decoration-2 underline-offset-4'>
					{event.when.startDate
						? formatEventDate(event.when.startDate, locale)
						: '—'}
				</p>
			</div>

			<h3 className='font-tagada text-3xl leading-tight tracking-wide lg:text-4xl'>
				{event.title}
			</h3>

			<p className='font-greed text-lg font-bold uppercase tracking-wider underline underline-offset-4 transition-colors group-hover:text-rosso-500'>
				SCOPRI DI PIÙ
			</p>
		</Link>
	);
}
