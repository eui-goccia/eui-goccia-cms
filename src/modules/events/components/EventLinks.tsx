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
		<div>
			<p className='mb-2 font-greed text-sm font-bold uppercase tracking-widest'>
				{locale === 'it' ? 'LINK UTILI' : 'USEFUL LINKS'}
			</p>
			<ul className='flex flex-col gap-1'>
				{links.map((link) => (
					<li key={link.id}>
						<a
							className='font-greed text-lg underline underline-offset-4 transition-colors hover:text-rosso-500'
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
