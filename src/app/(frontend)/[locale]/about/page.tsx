import type { About, Image } from '@payload-types';
import type { Locales } from '@/i18n/routing';
import PartnerCard from '@/modules/components/PartnerCard';
import SectionBreakFill from '@/modules/components/shared/SectionBreakFill';
import { getCachedGlobal } from '@/modules/utilities/getGlobals';

export const dynamic = 'force-static';
// Longer revalidation since content rarely changes
export const revalidate = 3600; // 1 hour

interface AboutPageProps {
	params: Promise<{ locale: string }>;
}

export default async function ChiSiamo({ params }: AboutPageProps) {
	const { locale } = await params;
	const about = (await getCachedGlobal('about', 1, locale as Locales)) as About;
	const partners = about.partners;
	return (
		<main className='mb-auto bg-black'>
			<div className='pt-30 md:pt-50 grid grid-cols-12 pb-20 md:pb-40 items-center text-3xl justify-center'>
				<h1 className='sr-only'>Chi Siamo</h1>
				<p className='text-white col-start-2 varW600 col-span-10 font-ghost text-3xl md:text-4xl lg:text-5xl uppercase'>
					{about.description}
				</p>
			</div>
			<section className='w-full'>
				{partners?.map((partner) => (
					<PartnerCard
						key={partner.name}
						partnerName={partner.name}
						partnerBio={partner.bio}
						logo={partner.logo as Image}
						bgColor='[&:nth-child(3n)]:bg-rosso-500 [&:nth-child(3n+1)]:bg-verde-500 [&:nth-child(3n+2)]:bg-blu-300'
						members={partner.members}
					/>
				))}
			</section>
			<SectionBreakFill />
		</main>
	);
}
