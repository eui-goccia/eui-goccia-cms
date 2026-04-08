import type { About, Image } from '@payload-types';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locales } from '@/i18n/routing';
import PartnerCard from '@/modules/components/PartnerCard';
import SectionBreakFill from '@/modules/components/shared/SectionBreakFill';
import { getGlobal } from '@/modules/utilities/getGlobals';

interface AboutPageProps {
	params: Promise<{ locale: string }>;
}

export default async function ChiSiamo({ params }: AboutPageProps) {
	const { locale } = await params;
	setRequestLocale(locale);
	const t = await getTranslations('aboutPage');
	const about = (await getGlobal('about', 1, locale as Locales)) as About;
	const partners = about.partners;
	return (
		<main className='mb-auto bg-blu-300'>
			<div className=' flex h-screen bg-black items-start text-3xl justify-center'>
				<h1 className='sr-only'>{t('title')}</h1>
				<p className='text-white  w-1/2 varW600 pt-24 font-ghost pb-20 text-3xl md:text-4xl px-5 lg:px-10 lg:text-5xl'>
					{about.description}
				</p>
				<div className='w-1/2 bg-amber-200 h-full' />
			</div>
			<div className='bg-blu-500 flex font-ghost pt-5 pb-2.5 items-center justify-center rounded-2xl text-9xl text-blu-300'>
				{t('partnership')}
			</div>
			<section className='w-full  gap-32 py-32 flex flex-col items-center'>
				{partners?.map((partner) => (
					<PartnerCard
						bgColor='bg-blu-300'
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
