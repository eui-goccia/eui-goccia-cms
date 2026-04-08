import type { ReactNode } from 'react';

interface HeadingProps {
	children: ReactNode;
	id?: string;
}

export default function BlockHeading({ children, id }: HeadingProps) {
	return (
		<h2
			className='font-tagada md:text-5xl text-4xl lg:text-6xl scroll-mt-48'
			id={id}
		>
			{children}
		</h2>
	);
}
