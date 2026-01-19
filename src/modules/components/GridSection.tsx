import type { ReactNode } from 'react';

interface GridProps {
	sectionTitle: string;
	children: ReactNode;
}

export default function GridSection({ sectionTitle, children }: GridProps) {
	return (
		<section className='bg-black flex flex-col gap-0'>
			<div className='bg-rosso-500 font-ghost text-2xl rounded-full px-4 uppercase py-1.5'>
				<h2>{sectionTitle}</h2>
			</div>
			<div>{children}</div>
		</section>
	);
}
