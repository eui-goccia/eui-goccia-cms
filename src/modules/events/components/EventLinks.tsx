import type { Event } from '@payload-types';

interface EventLinksProps {
	links: Event['links'];
	locale: string;
}

export function EventLinks({ links, locale }: EventLinksProps) {
	if (!links || links.length === 0) {
		return null;
	}

	return (
		<div className='text-lg font-bold pt-8 md:pt-0'>
			<p className='font-greed   uppercase '>
				{locale === 'it' ? 'LINK UTILI' : 'USEFUL LINKS'}
			</p>
			<ul className='flex flex-col'>
				{links.map((link) => (
					<li key={link.id}>
						<a
							className='font-greed underline underline-offset-2 transition-colors hover:text-rosso-500'
							href={link.url}
							rel='noopener noreferrer'
							target='_blank'
						>
							{link.label}
						</a>
					</li>
				))}
			</ul>
		</div>
	);
}
