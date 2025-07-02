import type { Goccia, Image } from '@payload-types';
import { CustomImage } from './CustomImage';

export default function TimelineEvent({
	event,
}: {
	event: NonNullable<Goccia['timeline']>[number];
	key: React.Key;
}) {
	const cover = event.cover as Image;

	return (
		<div className='text-white gap-y-5 md:gap-y-10 grid gap-x-5 grid-cols-12'>
			<h3 className='flex w-full flex-col  md:grid gap-1 md:gap-5 col-span-full grid-cols-12 items-center uppercase'>
				<div className='flex col-span-2 flex-row md:flex-col gap-2 md:gap-0 justify-center items-center text-center'>
					<span className=' flex justify-center font-tagada lg:text-7xl md:text-6xl sm:text-5xl text-4xl xl:text-8xl col-start-1'>
						{event.start}
					</span>
					{event.end && (
						<>
							<span className='block md:hidden'>—</span>
							<span className='w-full text-pretty flex justify-center font-tagada lg:text-7xl md:text-6xl sm:text-5xl text-4xl xl:text-8xl col-start-1'>
								{event.end}
							</span>
						</>
					)}
				</div>
				{event.title && (
					<span className='col-start-1 text-center md:text-left text-balance md:col-start-3 varW600 col-span-full bg-rosso-500 font-ghost lg:text-6xl md:text-5xl text-3xl sm:text-4xl xl:text-7xl px-10 flex items-center py-5 justify-center md:justify-start md:justify-star w-full rounded-full'>
						{event.title}
					</span>
				)}
			</h3>
			<div className='col-start-1 col-span-2 hidden md:flex justify-center w-full'>
				<div className='h-full border-l-2 border-white w-fit'></div>
			</div>
			<div className='col-start-1 md:col-start-3 col-span-full flex flex-col lg:grid grid-cols-10 gap-5'>
				<CustomImage
					className='col-span-6 object-cover rounded-3xl aspect-16/10 col-start-1 w-full h-full'
					image={cover}
					size='xlarge'
					alt={cover.caption}
				/>
				<p className='col-start-7 flex flex-col gap-4 font-greed text-2xl col-span-full'>
					<span>{event.description}</span>

					<span className='text-sm italic'>{cover?.caption}</span>
				</p>
			</div>
		</div>
	);
}
