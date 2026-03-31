'use client';

import type { ComponentType, ReactNode } from 'react';
import { useEffect, useState } from 'react';

interface ReactLenisProps {
	children: ReactNode;
	root?: boolean;
	[key: string]: unknown;
}

export function ReactLenis({ children, ...props }: ReactLenisProps) {
	const [LenisComponent, setLenisComponent] =
		useState<ComponentType<ReactLenisProps> | null>(null);

	useEffect(() => {
		window.scrollTo(0, 0);
		import('lenis/react').then((mod) => {
			setLenisComponent(() => mod.ReactLenis as ComponentType<ReactLenisProps>);
		});
	}, []);

	if (!LenisComponent) {
		return <>{children}</>;
	}

	return <LenisComponent {...props}>{children}</LenisComponent>;
}
