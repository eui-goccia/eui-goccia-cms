'use client';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { LocaleSwitcher } from '@/i18n/LocaleSwitcher';
import { Link } from '@/i18n/routing';
import LogoGoccia from '@/modules/components/logos/LogoGoccia';
import { cn } from '@/modules/utilities/cnUtils';

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
		{ href: '/eventi', label: t('eventi'), activeColor: 'underline' },
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
				<button
					aria-label='Close menu'
					className='fixed inset-0 bg-black/20 backdrop-blur-sm z-40 animate-fade-in motion-reduce:animate-none cursor-default'
					onClick={closeMenu}
					type='button'
				/>
			) : null}

			<header
				className={cn(
					'bg-rosa-300 flex items-center justify-center font-greed py-2 z-50 fixed top-0 left-0 right-0 transition-all motion-reduce:transition-none origin-top overflow-hidden',
					menuIsOpen
						? 'max-h-[80vh] rounded-[32px] duration-500 ease-in-out'
						: 'max-h-16 rounded-[48px] duration-300 ease-in'
				)}
			>
				<nav className='hidden md:inline w-full'>
					{/* Desktop */}
					<ul className='flex uppercase justify-between text-xl'>
						<li className='w-full flex items-center justify-center'>
							<Link
								aria-label='Home'
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
							<Link aria-label='Home' href='/' locale={locale}>
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
									<li
										className='w-full flex items-center justify-center animate-fade-slide-in opacity-0 motion-reduce:animate-none motion-reduce:opacity-100'
										key={item.label}
										style={{
											animationDelay: `${250 + index * 100}ms`,
											animationFillMode: 'forwards',
										}}
									>
										<NavLink
											{...item}
											locale={locale}
											onClick={closeMenu}
											pathname={pathname}
										/>
									</li>
								))}
								<li
									className='w-full flex items-center justify-center animate-fade-slide-in opacity-0 motion-reduce:animate-none motion-reduce:opacity-100'
									style={{
										animationDelay: `${250 + navItems.length * 100}ms`,
										animationFillMode: 'forwards',
									}}
								>
									<LocaleSwitcher />
								</li>
							</ul>
						</nav>
					) : null}
				</div>
			</header>
		</>
	);
}
