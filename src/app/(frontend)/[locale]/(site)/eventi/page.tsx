import configPromise from '@payload-config';
import { cacheLife, cacheTag } from 'next/cache';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { PaginatedDocs } from 'payload';
import { getPayload } from 'payload';
import type { Locales } from '@/i18n/routing';
import EventCard from '@/modules/components/EventCard';
import type { Event } from '@/modules/payload/payload-types';
import {
	collectionBaseTag,
	collectionTag,
} from '@/modules/utilities/cacheTags';

interface EventiPageProps {
	params: Promise<{ locale: string }>;
}

interface EventListingData {
	pastEvents: Event[];
	upcomingEvents: Event[];
}

const marqueeItems = ['a', 'b', 'c', 'd', 'e', 'f'];

function Marquee({ label }: { label: string }) {
	return (
		<div className='overflow-hidden mt-14 bg-rosso-500'>
			<div className='inline-flex w-full flex-nowrap'>
				<ul className='flex animate-infinite-scroll items-center [&_li]:mx-4'>
					{marqueeItems.map((key) => (
						<li key={key}>
							<p className='whitespace-nowrap pt-5 pb-3 font-tagada text-4xl uppercase tracking-wide text-black md:text-5xl'>
								{label}
							</p>
						</li>
					))}
				</ul>
				<ul
					aria-hidden='true'
					className='flex animate-infinite-scroll items-center [&_li]:mx-4'
				>
					{marqueeItems.map((key) => (
						<li key={key}>
							<p className='whitespace-nowrap pt-5 pb-3 font-tagada text-4xl uppercase tracking-wide text-black md:text-5xl'>
								{label}
							</p>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

async function EventList({
	locale,
	noUpcomingEventsLabel,
	pastHeadingLabel,
}: {
	locale: string;
	noUpcomingEventsLabel: string;
	pastHeadingLabel: string;
}) {
	const { pastEvents, upcomingEvents } =
		await getPublishedEventListingData(locale);

	return (
		<>
			<section className='px-5 pb-10 pt-10 lg:px-10'>
				{upcomingEvents.length > 0 ? (
					<div className='grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-4'>
						{upcomingEvents.map((event) => (
							<EventCard event={event} key={event.id} />
						))}
					</div>
				) : (
					<p className='py-20 text-center font-greed text-2xl tracking-wide text-black/50'>
						{noUpcomingEventsLabel}
					</p>
				)}
			</section>

			{pastEvents.length > 0 ? (
				<>
					<div className='overflow-hidden bg-black'>
						<p className='px-5 py-6 font-tagada text-4xl uppercase tracking-wider text-rosso-500 md:text-5xl lg:px-10'>
							{pastHeadingLabel}
						</p>
					</div>

					<section className='px-5 pb-16 pt-10 lg:px-10'>
						<div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
							{pastEvents.map((event) => (
								<EventCard event={event} key={event.id} />
							))}
						</div>
					</section>
				</>
			) : null}
		</>
	);
}

async function getPublishedEventListingData(
	locale: string
): Promise<EventListingData> {
	'use cache';
	cacheLife('minutes');
	cacheTag(collectionBaseTag('events'), collectionTag('events', locale));

	const payload = await getPayload({ config: configPromise });
	const events = (await payload.find({
		collection: 'events',
		depth: 2,
		draft: false,
		limit: 0,
		locale: locale as Locales,
		overrideAccess: false,
		sort: '-when.startDate',
		where: {
			parent: { exists: false },
		},
	})) as PaginatedDocs<Event>;

	const now = new Date();
	const upcomingEvents = events.docs
		.filter((event) => new Date(event.when.endDate) >= now)
		.sort(
			(a, b) =>
				new Date(a.when.startDate).getTime() -
				new Date(b.when.startDate).getTime()
		);
	const pastEvents = events.docs.filter(
		(event) => new Date(event.when.endDate) < now
	);

	return {
		pastEvents,
		upcomingEvents,
	};
}

export default async function EventiPage({ params }: EventiPageProps) {
	const { locale } = await params;
	setRequestLocale(locale);
	const t = await getTranslations('events');

	return (
		<div className='bg-blu-300 min-h-screen'>
			<Marquee label={t('upcomingMarquee')} />
			<EventList
				locale={locale}
				noUpcomingEventsLabel={t('noUpcomingEvents')}
				pastHeadingLabel={t('pastHeading')}
			/>
		</div>
	);
}
