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
		let isMounted = true;
		window.scrollTo(0, 0);
		import('lenis/react')
			.then((mod) => {
				if (isMounted) {
					setLenisComponent(
						() => mod.ReactLenis as ComponentType<ReactLenisProps>
					);
				}
			})
			.catch((error) => {
				console.error('Failed to load lenis/react:', error);
			});
		return () => {
			isMounted = false;
		};
	}, []);

	if (!LenisComponent) {
		return <>{children}</>;
	}

	return <LenisComponent {...props}>{children}</LenisComponent>;
}
