'use client';

import { ReactLenis as OriginalReactLenis } from 'lenis/react';
import type { ReactNode } from 'react';
import { useEffect } from 'react';

interface ReactLenisProps {
	children: ReactNode;
	root?: boolean;
	[key: string]: unknown;
}

export function ReactLenis({ children, ...props }: ReactLenisProps) {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return <OriginalReactLenis {...props}>{children}</OriginalReactLenis>;
}

export * from 'lenis/react';
