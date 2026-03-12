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
			<div className=' flex h-screen items-start text-3xl justify-center'>
				<h1 className='sr-only'>Chi Siamo</h1>
				<p className='text-white w-1/2 varW600 pt-24 font-ghost pb-20 text-3xl md:text-4xl px-5 lg:px-10 lg:text-5xl'>
					{about.description}
				</p>
				<div className='w-1/2 bg-amber-200 h-full' />
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
