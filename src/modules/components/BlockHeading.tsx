import type { ReactNode } from 'react';

type HeadingProps = {
	children: ReactNode;
	id?: string;
};

export default function BlockHeading({ children, id }: HeadingProps) {
	return (
		<h2
			className='font-ghost varW600 md:text-4xl text-3xl lg:text-5xl uppercase scroll-mt-48'
			id={id}
		>
			{children}
		</h2>
	);
}
