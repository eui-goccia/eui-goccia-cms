import type { LaGoccia } from '@payload-types';
import SectionBreakText from '@/modules/components/shared/SectionBreakText';
import TimelineEvent from '@/modules/components/TimelineEvent';
import { getCachedGlobal } from '@/modules/utilities/getGlobals';

export default async function GocciaPage() {
	const goccia = (await getCachedGlobal('la-goccia', 1)) as LaGoccia;
	return (
		<main className='mb-auto'>
			<h1 className='sr-only'>La Goccia</h1>
			<div className='h-dvh grid relative grid-cols-12 bg-rosso-500 items-center  justify-center'>
				<SectionBreakText text={goccia.description} />
			</div>
			<section className='bg-black px-10 py-10 md:py-16 flex flex-col gap-16 md:gap-20'>
				{goccia.timeline?.map((event) => (
					<TimelineEvent key={event.title} event={event} />
				))}
			</section>
		</main>
	);
}
