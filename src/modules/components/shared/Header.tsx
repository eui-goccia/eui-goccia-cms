'use client';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Fragment, useState } from 'react';
import { Link } from '@/i18n/routing';
import LogoGoccia from '@/modules/components/logos/LogoGoccia';

export default function Header() {
	const [menuIsOpen, setMenuIsOpen] = useState(false);
	const pathname = usePathname();
	const t = useTranslations();
	const locale = useLocale();

	const toggleMenu = () => {
		setMenuIsOpen((prev) => !prev);
	};

	const closeMenu = () => {
		setMenuIsOpen(false);
	};

	return (
		<Fragment>
			{/* Backdrop */}
			{menuIsOpen && (
				<motion.div
					className='fixed inset-0 bg-black/20 backdrop-blur-sm z-40'
					onClick={closeMenu}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{
						duration: 0.15,
					}}
				/>
			)}

			<motion.header
				className={`bg-white border font-greed border-black h-fit py-2 z-50 fixed top-0 left-0 right-0`}
				initial={{
					height: '58px',
					borderRadius: '29px',
				}}
				animate={{
					height: menuIsOpen ? '360px' : '58px',
					borderRadius: menuIsOpen ? '32px' : '29px',
				}}
				transition={{
					duration: menuIsOpen ? 0.5 : 0.3,
					ease: menuIsOpen ? 'easeInOut' : 'easeIn',
				}}
				style={{
					transformOrigin: 'top',
				}}
			>
				<nav className='hidden md:inline'>
					{/* Desktop */}
					<ul className='flex uppercase justify-between text-xl'>
						<li className='w-full  flex items-center justify-center'>
							<Link
								locale={locale}
								className={`hover:underline underline-offset-4 decoration-1 ${
									pathname === '/progetto' ? 'text-rosa-500 underline ' : ''
								}`}
								href='/progetto'
							>
								{t('project')}
							</Link>
						</li>
						<li className='w-full flex items-center justify-center'>
							<Link
								locale={locale}
								className={`hover:underline underline-offset-4 decoration-1 ${
									pathname === '/la-goccia' ? 'text-rosso-500 underline' : ''
								}`}
								href='/la-goccia'
							>
								{t('goccia')}
							</Link>
						</li>
						<li className='w-full  flex items-center justify-center'>
							<Link
								locale={locale}
								className='hover:underline underline-offset-4 decoration-1'
								href='/'
							>
								<LogoGoccia className='h-10' />
							</Link>
						</li>
						<li className='w-full  flex items-center justify-center'>
							<Link
								locale={locale}
								className={`hover:underline underline-offset-4 decoration-1 ${
									pathname === '/blog' ? 'text-blue-500 underline' : ''
								}`}
								href='/blog'
							>
								{t('blog')}
							</Link>
						</li>
						<li className='w-full  flex items-center justify-center'>
							<Link
								locale={locale}
								className={`hover:underline underline-offset-4 decoration-1 ${
									pathname === '/about' ? 'text-verde-500 underline' : ''
								}`}
								href='/about'
							>
								{t('about')}
							</Link>
						</li>
					</ul>
				</nav>

				{/* Mobile */}
				<div className='flex md:hidden flex-col'>
					<ul className='flex uppercase px-10 justify-between text-xl'>
						<li className='w-fit flex items-center justify-center'>
							<Link locale={locale} href='/'>
								<LogoGoccia className='h-10' />
							</Link>
						</li>
						<button
							type='button'
							onClick={toggleMenu}
							className='w-fit flex items-center justify-center'
						>
							{menuIsOpen ? 'Close' : 'Menu'}
						</button>
					</ul>

					{menuIsOpen && (
						<nav className='pt-10 pb-20 relative z-20'>
							<ul className='flex flex-col uppercase gap-8 justify-between text-2xl'>
								<motion.li
									className='w-full flex items-center justify-center'
									initial={{ opacity: 0, y: -20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{
										delay: 0.25,
										duration: 0.25,
									}}
								>
									<Link
										locale={locale}
										className={`hover:underline underline-offset-4 decoration-1 ${
											pathname === '/progetto' ? 'text-rosa-500 underline' : ''
										}`}
										href='/progetto'
										onClick={closeMenu}
									>
										{t('project')}
									</Link>
								</motion.li>
								<motion.li
									className='w-full flex items-center justify-center'
									initial={{ opacity: 0, y: -20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{
										delay: 0.35,
										duration: 0.25,
									}}
								>
									<Link
										locale={locale}
										className={`hover:underline underline-offset-4 decoration-1 ${
											pathname === '/la-goccia'
												? 'text-rosso-500 underline'
												: ''
										}`}
										href='/la-goccia'
										onClick={closeMenu}
									>
										{t('goccia')}
									</Link>
								</motion.li>
								<motion.li
									className='w-full opacity-50 flex items-center justify-center'
									initial={{ opacity: 0, y: -20 }}
									animate={{ opacity: 0.5, y: 0 }}
									transition={{
										delay: 0.45,
										duration: 0.25,
									}}
								>
									<Link
										locale={locale}
										className={`hover:underline underline-offset-4 decoration-1 ${
											pathname === '/blog' ? 'text-blue-500 underline' : ''
										}`}
										href='/blog'
										onClick={closeMenu}
									>
										{t('blog')}
									</Link>
								</motion.li>
								<motion.li
									className='w-full flex items-center justify-center'
									initial={{ opacity: 0, y: -20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{
										delay: 0.55,
										duration: 0.25,
									}}
								>
									<Link
										locale={locale}
										className={`hover:underline underline-offset-4 decoration-1 ${
											pathname === '/about' ? 'text-verde-500 underline' : ''
										}`}
										href='/about'
										onClick={closeMenu}
									>
										{t('about')}
									</Link>
								</motion.li>
							</ul>
						</nav>
					)}
				</div>
			</motion.header>
		</Fragment>
	);
}
