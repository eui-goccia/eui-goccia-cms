import type { About, Image } from '@payload-types';
import type { Locales } from '@/i18n/routing';
import PartnerCard from '@/modules/components/PartnerCard';
import SectionBreakFill from '@/modules/components/shared/SectionBreakFill';
import { getGlobal } from '@/modules/utilities/getGlobals';

interface AboutPageProps {
	params: Promise<{ locale: string }>;
}

export default async function ChiSiamo({ params }: AboutPageProps) {
	const { locale } = await params;
	const about = (await getGlobal('about', 1, locale as Locales)) as About;
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
						bgColor='[&:nth-child(3n)]:bg-rosso-500 [&:nth-child(3n+1)]:bg-verde-500 [&:nth-child(3n+2)]:bg-blu-300'
						key={partner.name}
						logo={partner.logo as Image}
						members={partner.members}
						partnerBio={partner.bio}
						partnerName={partner.name}
					/>
				))}
			</section>
			<SectionBreakFill />
		</main>
	);
}
