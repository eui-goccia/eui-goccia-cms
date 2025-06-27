import type { ReactNode } from 'react';

interface HeadingProps {
	children: ReactNode;
	id?: string;
}

export default function BlockHeading({ children, id }: HeadingProps) {
	return (
		<h2
			id={id}
			className='font-ghost varW600 md:text-4xl text-3xl lg:text-5xl uppercase scroll-mt-48'
		>
			{children}
		</h2>
	);
}
