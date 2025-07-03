'use client';
import type { Progetto } from '@payload-types';
import { Fragment, useEffect, useState } from 'react';
import { Link } from '@/i18n/routing';
import { BlockRenderer } from '@/modules/blocks/BlockRenderer';
import BlockHeading from '@/modules/components/BlockHeading';
import SectionBreakFill from '@/modules/components/shared/SectionBreakFill';

export default function ProgettoClient({ project }: { project: Progetto }) {
	const [activeSection, setActiveSection] = useState('');

	useEffect(() => {
		const handleScroll = () => {
			const sections =
				project.sections?.map((item) => item.url.substring(1)) || []; // Remove # from URLs
			const scrollPosition = window.scrollY + 200; // Offset for header

			for (let i = sections.length - 1; i >= 0; i--) {
				const element = document.getElementById(sections[i]);
				if (element && element.offsetTop <= scrollPosition) {
					setActiveSection(sections[i]);
					break;
				}
			}
		};

		window.addEventListener('scroll', handleScroll);
		handleScroll(); // Check initial position

		return () => window.removeEventListener('scroll', handleScroll);
	}, [project.sections]);

	return (
		<Fragment>
			<div className='px-5 lg:px-10 pb-30 grid grid-cols-12 gap-5 bg-rosa-300'>
				<aside className='col-start-1 2xl:col-start-2 hidden lg:inline sticky lg:top-34 xl:top-50 h-fit col-span-4 2xl:col-span-3'>
					<nav>
						<ul className='font-ghost varW600 uppercase text-2xl'>
							{project.sections?.map((chapter) => {
								const sectionId = chapter.url?.substring(1) || ''; // Remove # from URL
								const isActive = activeSection === sectionId;

								return (
									<li key={chapter.url}>
										<a
											className={`flex gap-2 ${
												isActive
													? 'text-blu-500 underline underline-offset-4 decoration-1'
													: ''
											}`}
											href={chapter.url}
										>
											→
											<span className='hover:underline decoration-1 underline-offset-4'>
												{chapter.title}
											</span>
										</a>
									</li>
								);
							})}
						</ul>
					</nav>
				</aside>
				<article className='col-start-1 lg:col-start-5 col-span-full lg:col-span-8 xl:col-span-7 flex flex-col gap-10 md:gap-20 lg:gap-24 pt-28 lg:pt-32 xl:pt-48 items-center text-3xl justify-center'>
					{project.sections?.map((section) => {
						return (
							<div key={section.url} className='flex flex-col gap-5'>
								<BlockHeading id={section.url?.substring(1)}>
									{section.title}
								</BlockHeading>
								{section.content.map((block) => {
									return <BlockRenderer block={block} key={block.id} />;
								})}
							</div>
						);
					})}
				</article>
			</div>
			<div className=' hidden bg-rosa-300 grid-cols-12 gap-5 px-10 py-30'>
				<Link
					className='underline hover:no-underline col-start-5 w-fit col-span-full font-greed uppercase text-3xl justify-center'
					href='https://google.com'
				>
					Leggi il comunicato stampa completo →
				</Link>
			</div>
			<SectionBreakFill />
		</Fragment>
	);
}
