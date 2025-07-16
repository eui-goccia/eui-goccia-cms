import { getLocale, getTranslations } from 'next-intl/server';
import { LocaleSwitcher } from '@/i18n/LocaleSwitcher';
import { Link } from '@/i18n/routing';
import LogoEU from '../logos/LogoEU';
import LogoEUI from '../logos/LogoEUI';
import LogoGoccia from '../logos/LogoGoccia';

interface PagesProps {
	name: string;
	url: string;
}
interface SocialsProp {
	name: string;
	url: string;
}

const socials: SocialsProp[] = [
	{
		name: 'Instagram',
		url: 'https://www.instagram.com/goccia.eu',
	},
	{
		name: 'LinkedIn',
		url: 'https://www.linkedin.com/company/goccia-eu-project',
	},
	{
		name: 'Facebook',
		url: 'https://www.facebook.com/people/Goccia-EU-Project/61576369247616/',
	},
	{
		name: 'Email',
		url: 'mailto:mail@eui-goccia.eu',
	},
];

export default async function Footer() {
	const t = await getTranslations();
	const locale = await getLocale();
	const pages: PagesProps[] = [
		{
			name: 'Homepage',
			url: '/',
		},
		{
			name: t('project'),
			url: '/progetto',
		},
		{
			name: t('goccia'),
			url: '/la-goccia',
		},
		{
			name: t('about'),
			url: '/about',
		},
	];
	return (
		<footer className='bg-white p-10 flex flex-col lg:grid grid-cols-12 gap-5'>
			<div className='col-span-full lg:col-span-8 col-start-1 space-y-12 xl:col-start-2'>
				<ul className='flex flex-wrap md:flex-row flex-col items-center gap-14 md:gap-20 lg:gap-24'>
					<li>
						<LogoGoccia className='h-16 w-full' />
					</li>
					<li>
						<LogoEU className='h-9 w-full' />
					</li>
					<li>
						<LogoEUI className='h-8 w-full' />
					</li>
				</ul>
				<ul className='font-greed space-y-0.5'>
					<li>CUP B41I23000570001</li>
					<li>
						Green Opportunities to Clean-up Contaminants through an Interspecies
						Alliance
					</li>
					<li>© 2025</li>
				</ul>
			</div>
			<div className='flex flex-col justify-between col-start-9  col-span-full xl:col-span-3 gap-5'>
				<div className='flex gap-5 md:flex-row flex-col w-full'>
					<nav className='w-full md:w-1/2 uppercase'>
						<ul>
							{pages.map((page) => (
								<li key={page.name}>
									<Link
										locale={locale}
										className='hover:underline'
										href={page.url}
									>
										{page.name}
									</Link>
								</li>
							))}
						</ul>
					</nav>
					<nav className='w-full font-greed md:w-1/2 '>
						<h3 className='uppercase'>{t('contacts')}</h3>
						<ul>
							{socials.map((social) => (
								<li key={social.name}>
									<a
										target='_blank'
										rel='noopener noreferrer'
										className='hover:underline'
										href={social.url}
									>
										{social.name}
									</a>
								</li>
							))}
						</ul>
					</nav>
				</div>
				<ul className=' md:flex-row font-greed flex flex-col'>
					<li className='w-full'>
						<Link
							locale={locale}
							className='hover:underline'
							href='/privacy-policy'
						>
							Privacy Policy
						</Link>
					</li>
				</ul>
			</div>
			<div className='col-span-full lg:col-span-8 pt-8 col-start-1 space-y-2 xl:col-start-2'>
				<h2 className='font-greed'>Languages</h2>
				<LocaleSwitcher />
			</div>
		</footer>
	);
}
