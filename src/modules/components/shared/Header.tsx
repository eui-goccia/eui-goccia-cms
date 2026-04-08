'use client';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { LocaleSwitcher } from '@/i18n/LocaleSwitcher';
import { Link } from '@/i18n/routing';
import LogoGoccia from '@/modules/components/logos/LogoGoccia';
import { cn } from '@/modules/utilities/cnUtils';

const HEADER_INITIAL = { height: '64px', borderRadius: '48px' };
const BACKDROP_TRANSITION = { duration: 0.15 };

interface NavItem {
	href: string;
	label: string;
	activeColor: string;
}

function NavLink({
	href,
	label,
	activeColor,
	pathname,
	locale,
	onClick,
}: NavItem & { pathname: string; locale: string; onClick?: () => void }) {
	return (
		<Link
			className={cn(
				'hover:underline underline-offset-4 decoration-1',
				pathname === href && activeColor
			)}
			href={href}
			locale={locale}
			onClick={onClick}
		>
			{label}
		</Link>
	);
}

export default function Header() {
	const [menuIsOpen, setMenuIsOpen] = useState(false);
	const rawPathname = usePathname();
	const t = useTranslations();
	const locale = useLocale();
	const pathname = rawPathname.replace(`/${locale}`, '') || '/';

	const toggleMenu = () => {
		setMenuIsOpen((prev) => !prev);
	};

	const closeMenu = () => {
		setMenuIsOpen(false);
	};

	const navItems: NavItem[] = [
		{
			href: '/progetto',
			label: t('project'),
			activeColor: 'underline',
		},
		{
			href: '/la-goccia',
			label: t('goccia'),
			activeColor: 'underline',
		},
		{ href: '/blog', label: t('blog'), activeColor: 'underline' },
		{
			href: '/eventi',
			label: t('eventi'),
			activeColor: 'underline',
		},
		{
			href: '/about',
			label: t('about'),
			activeColor: 'underline',
		},
	];

	return (
		<>
			{/* Backdrop */}
			{menuIsOpen ? (
				<motion.div
					animate={{ opacity: 1 }}
					className='fixed inset-0 bg-black/20 backdrop-blur-sm z-40'
					initial={{ opacity: 0 }}
					onClick={closeMenu}
					transition={BACKDROP_TRANSITION}
				/>
			) : null}

			<motion.header
				animate={{
					height: menuIsOpen ? 'auto' : '4rem',
					borderRadius: menuIsOpen ? '32px' : '48px',
				}}
				className='bg-rosa-300 flex items-center justify-center font-greed h-fit py-2 z-50 fixed top-0 left-0 right-0'
				initial={HEADER_INITIAL}
				style={{ transformOrigin: 'top' }}
				transition={{
					duration: menuIsOpen ? 0.5 : 0.3,
					ease: menuIsOpen ? 'easeInOut' : 'easeIn',
				}}
			>
				<nav className='hidden md:inline w-full'>
					{/* Desktop */}
					<ul className='flex uppercase justify-between text-xl'>
						<li className='w-full flex items-center justify-center'>
							<Link
								className='hover:underline underline-offset-4 decoration-1'
								href='/'
								locale={locale}
							>
								<LogoGoccia className='h-10 fill-black' />
							</Link>
						</li>
						{navItems.map((item) => (
							<li
								className='w-full flex items-center justify-center'
								key={item.label}
							>
								<NavLink {...item} locale={locale} pathname={pathname} />
							</li>
						))}
						<li className='w-full flex items-center justify-center'>
							<LocaleSwitcher />
						</li>
					</ul>
				</nav>

				{/* Mobile */}
				<div className='flex md:hidden flex-col w-full'>
					<ul className='flex uppercase px-10 justify-between text-xl'>
						<li className='w-fit flex items-center justify-center'>
							<Link href='/' locale={locale}>
								<LogoGoccia className='h-10' />
							</Link>
						</li>
						<li className='w-fit flex items-center justify-center'>
							<button
								aria-expanded={menuIsOpen}
								onClick={toggleMenu}
								type='button'
							>
								{menuIsOpen ? 'Close' : 'Menu'}
							</button>
						</li>
					</ul>

					{menuIsOpen ? (
						<nav className='pt-10 pb-20 relative z-20'>
							<ul className='flex flex-col uppercase gap-8 justify-between text-2xl'>
								{navItems.map((item, index) => (
									<motion.li
										animate={{ opacity: 1, y: 0 }}
										className='w-full flex items-center justify-center'
										initial={{ opacity: 0, y: -20 }}
										key={item.label}
										transition={{
											delay: 0.25 + index * 0.1,
											duration: 0.25,
										}}
									>
										<NavLink
											{...item}
											locale={locale}
											onClick={closeMenu}
											pathname={pathname}
										/>
									</motion.li>
								))}
							</ul>
							<div className='flex justify-center pt-8 text-2xl'>
								<LocaleSwitcher />
							</div>
						</nav>
					) : null}
				</div>
			</motion.header>
		</>
	);
}
