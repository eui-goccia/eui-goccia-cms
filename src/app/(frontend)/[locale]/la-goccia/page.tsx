import type { LaGoccia } from '@payload-types';
import type { Locales } from '@/i18n/routing';
import SectionBreakText from '@/modules/components/shared/SectionBreakText';
import TimelineEvent from '@/modules/components/TimelineEvent';
import { getCachedGlobal } from '@/modules/utilities/getGlobals';

export const dynamic = 'force-static';
// Longer revalidation since content rarely changes
export const revalidate = 3600; // 1 hour

type GocciaPageProps = {
	params: Promise<{ locale: string }>;
};

export default async function GocciaPage({ params }: GocciaPageProps) {
	const { locale } = await params;
	const goccia = (await getCachedGlobal(
		'la-goccia',
		1,
		locale as Locales
	)) as LaGoccia;
	return (
		<main className='mb-auto'>
			<h1 className='sr-only'>La Goccia</h1>
			<div className='h-dvh grid relative grid-cols-12 bg-rosso-500 items-center  justify-center'>
				<SectionBreakText text={goccia.description} />
			</div>
			<section className='bg-black px-10 py-10 md:py-16 flex flex-col gap-16 md:gap-20'>
				{goccia.timeline?.map((event) => (
					<TimelineEvent event={event} key={event.title} />
				))}
			</section>
		</main>
	);
}
