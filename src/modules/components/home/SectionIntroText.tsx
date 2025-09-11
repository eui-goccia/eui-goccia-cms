import type { Home } from '@payload-types';
import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import MarqueeLogo from '@/modules/components/MarqueeLogo';
import RichText from '@/modules/editor/component';

/* TODO add grid like the other pages */
export default async function SectionIntroText({ home }: { home: Home }) {
	const t = await getTranslations();
	const locale = await getLocale();
	return (
		<article className='bg-blue-200 text-2xl md:text-3xl lg:text-4xl items-center flex flex-col lg:gap-20 md:gap-16 gap-12 xl:gap-28 font-greed lg:py-12 md:py-10 py-8 xl:py-16'>
			<RichText
				className='w-full max-w-6xl px-5 md:px-10 text-2xl md:text-3xl lg:text-4xl'
				data={home.intro_text_1}
			/>
			<MarqueeLogo />
			<RichText
				className='w-full max-w-6xl px-5 md:px-10 text-2xl md:text-3xl lg:text-4xl'
				data={home.intro_text_2}
			/>
			<div className='w-full max-w-6xl pb-24 md:pb-32'>
				<Link
					className='w-fit uppercase hover:no-underline decoration-1 underline underline-offset-4 max-w-6xl px-5 md:px-10'
					href='/progetto'
					locale={locale}
				>
					{t('discover_project')} →
				</Link>
			</div>
		</article>
	);
}
