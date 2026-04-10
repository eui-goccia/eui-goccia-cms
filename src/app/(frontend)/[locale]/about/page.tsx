import type { About } from '@payload-types';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locales } from '@/i18n/routing';
import Partenariato from '@/modules/components/logos/Partenariato';
import Partnership from '@/modules/components/logos/Partnership';
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
			<div className='flex flex-col md:flex-row h-full md:h-screen bg-black items-start text-3xl justify-center'>
				<hgroup className='md:w-1/2 w-full'>
					<h1 className='sr-only'>{t('title')}</h1>
					<p className='text-white varW600 pt-24 font-ghost pb-20 text-3xl md:text-4xl px-5 lg:px-10 lg:text-5xl'>
						{about.description}
					</p>
				</hgroup>
				<div className='md:w-1/2 w-full relative h-[75svh] md:h-full'>
					<Image
						alt=''
						className='object-cover absolute'
						fill
						quality='75'
						src='/images/about/og-team.webp'
					/>
				</div>
			</div>
			<div className='bg-blu-500 flex font-ghost py-2.5 md:py-10  px-5 items-center justify-center rounded-5xl md xl:text-9xl text-blu-300'>
				{locale === 'it' ? <Partenariato /> : <Partnership />}
			</div>

			<section className='w-full gap-16 md:gap-32 py-16 md:py-32 flex flex-col items-center'>
				{partners?.map((partner) => (
					<PartnerCard
						bgColor='bg-blu-300'
						key={partner.name}
						logo={partner.logo as PayloadImage}
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
