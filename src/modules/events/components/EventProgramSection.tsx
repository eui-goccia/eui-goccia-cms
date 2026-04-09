import type { Event, Image as ImageType } from '@payload-types';
import { Link } from '@/i18n/routing';
import { CustomImage } from '@/modules/components/CustomImage';
import { getLabelDisplayName } from '../labelDisplayNames';
import { getEventHref } from '../paths';
import { formatEventDateTime } from '../utils';

interface EventProgramSectionProps {
	subEventGroups: Map<string, Event[]>;
	locale: string;
	eventPath: string;
}

export function EventProgramSection({
	eventPath,
	subEventGroups,
	locale,
}: EventProgramSectionProps) {
	if (subEventGroups.size === 0) {
		return null;
	}

	return (
		<section className='px-5 pb-16 lg:px-10 xl:px-20'>
			<h2 className='mb-8 md:px-25 font-greed text-4xl font-bold  '>
				{locale === 'it' ? 'Programma' : 'Program'}
			</h2>
			{Array.from(subEventGroups.entries()).map(([label, labelEvents]) => (
				<div className='mb-12 last:mb-0 md:px-25' key={label}>
					<h3 className='mb-6 font-greed text-2xl font-bold'>
						{getLabelDisplayName(label, locale)}
					</h3>
					<div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
						{labelEvents.map((subEvent) => {
							const subImage =
								typeof subEvent.coverImage === 'string'
									? null
									: (subEvent.coverImage as ImageType);
							const subEventHref = subEvent.slug
								? `${eventPath}/${subEvent.slug}`
								: getEventHref(subEvent);

							return (
								<Link
									className='group flex flex-col gap-2'
									href={subEventHref}
									key={subEvent.id}
								>
									<div className='aspect-4/3 overflow-hidden rounded-[20px] bg-black/5'>
										{subImage ? (
											<CustomImage
												alt={subImage.alt || subEvent.title}
												className='object-cover rounded-[20px] transition-transform duration-500 group-hover:scale-105'
												image={subImage}
												size='medium'
												sizes='(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw'
											/>
										) : null}
									</div>
									<p className='font-greed text-lg tracking-wide'>
										{subEvent.title}
									</p>
									<p className='text-sm text-black/60'>
										{formatEventDateTime(subEvent.when.startDate, locale).date}
									</p>
								</Link>
							);
						})}
					</div>
				</div>
			))}
		</section>
	);
}
