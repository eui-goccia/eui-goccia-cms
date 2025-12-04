'use client';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { Link } from '@/i18n/routing';
import LogoGoccia from '@/modules/components/logos/LogoGoccia';

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: faster to write
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
		<>
			{/* Backdrop */}
			{menuIsOpen ? (
				<motion.div
					animate={{ opacity: 1 }}
					className='fixed inset-0 bg-black/20 backdrop-blur-sm z-40'
					initial={{ opacity: 0 }}
					onClick={closeMenu}
					transition={{
						duration: 0.15,
					}}
				/>
			) : null}

			<motion.header
				animate={{
					height: menuIsOpen ? '360px' : '58px',
					borderRadius: menuIsOpen ? '32px' : '29px',
				}}
				className={
					'bg-white border font-greed border-black h-fit py-2 z-50 fixed top-0 left-0 right-0'
				}
				initial={{
					height: '58px',
					borderRadius: '29px',
				}}
				style={{
					transformOrigin: 'top',
				}}
				transition={{
					duration: menuIsOpen ? 0.5 : 0.3,
					ease: menuIsOpen ? 'easeInOut' : 'easeIn',
				}}
			>
				<nav className='hidden md:inline'>
					{/* Desktop */}
					<ul className='flex uppercase justify-between text-xl'>
						<li className='w-full  flex items-center justify-center'>
							<Link
								className={`hover:underline underline-offset-4 decoration-1 ${
									pathname === '/progetto' ? 'text-rosa-500 underline ' : ''
								}`}
								href='/progetto'
								locale={locale}
							>
								{t('project')}
							</Link>
						</li>
						<li className='w-full flex items-center justify-center'>
							<Link
								className={`hover:underline underline-offset-4 decoration-1 ${
									pathname === '/la-goccia' ? 'text-rosso-500 underline' : ''
								}`}
								href='/la-goccia'
								locale={locale}
							>
								{t('goccia')}
							</Link>
						</li>
						<li className='w-full  flex items-center justify-center'>
							<Link
								className='hover:underline underline-offset-4 decoration-1'
								href='/'
								locale={locale}
							>
								<LogoGoccia className='h-10' />
							</Link>
						</li>
						<li className='w-full  flex items-center justify-center'>
							<Link
								className={`hover:underline underline-offset-4 decoration-1 ${
									pathname === '/blog' ? 'text-blue-500 underline' : ''
								}`}
								href='/blog'
								locale={locale}
							>
								{t('blog')}
							</Link>
						</li>
						<li className='w-full  flex items-center justify-center'>
							<Link
								className={`hover:underline underline-offset-4 decoration-1 ${
									pathname === '/about' ? 'text-verde-500 underline' : ''
								}`}
								href='/about'
								locale={locale}
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
							<Link href='/' locale={locale}>
								<LogoGoccia className='h-10' />
							</Link>
						</li>
						<button
							className='w-fit flex items-center justify-center'
							onClick={toggleMenu}
							type='button'
						>
							{menuIsOpen ? 'Close' : 'Menu'}
						</button>
					</ul>

					{menuIsOpen ? (
						<nav className='pt-10 pb-20 relative z-20'>
							<ul className='flex flex-col uppercase gap-8 justify-between text-2xl'>
								<motion.li
									animate={{ opacity: 1, y: 0 }}
									className='w-full flex items-center justify-center'
									initial={{ opacity: 0, y: -20 }}
									transition={{
										delay: 0.25,
										duration: 0.25,
									}}
								>
									<Link
										className={`hover:underline underline-offset-4 decoration-1 ${
											pathname === '/progetto' ? 'text-rosa-500 underline' : ''
										}`}
										href='/progetto'
										locale={locale}
										onClick={closeMenu}
									>
										{t('project')}
									</Link>
								</motion.li>
								<motion.li
									animate={{ opacity: 1, y: 0 }}
									className='w-full flex items-center justify-center'
									initial={{ opacity: 0, y: -20 }}
									transition={{
										delay: 0.35,
										duration: 0.25,
									}}
								>
									<Link
										className={`hover:underline underline-offset-4 decoration-1 ${
											pathname === '/la-goccia'
												? 'text-rosso-500 underline'
												: ''
										}`}
										href='/la-goccia'
										locale={locale}
										onClick={closeMenu}
									>
										{t('goccia')}
									</Link>
								</motion.li>
								<motion.li
									animate={{ opacity: 1, y: 0 }}
									className='w-full  flex items-center justify-center'
									initial={{ opacity: 0, y: -20 }}
									transition={{
										delay: 0.45,
										duration: 0.25,
									}}
								>
									<Link
										className={`hover:underline underline-offset-4 decoration-1 ${
											pathname === '/blog' ? 'text-blue-500 underline' : ''
										}`}
										href='/blog'
										locale={locale}
										onClick={closeMenu}
									>
										{t('blog')}
									</Link>
								</motion.li>
								<motion.li
									animate={{ opacity: 1, y: 0 }}
									className='w-full flex items-center justify-center'
									initial={{ opacity: 0, y: -20 }}
									transition={{
										delay: 0.55,
										duration: 0.25,
									}}
								>
									<Link
										className={`hover:underline underline-offset-4 decoration-1 ${
											pathname === '/about' ? 'text-verde-500 underline' : ''
										}`}
										href='/about'
										locale={locale}
										onClick={closeMenu}
									>
										{t('about')}
									</Link>
								</motion.li>
							</ul>
						</nav>
					) : null}
				</div>
			</motion.header>
		</>
	);
}
