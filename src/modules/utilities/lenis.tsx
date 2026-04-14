'use client';

import { usePathname } from 'next/navigation';
import type { ComponentType, ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';

interface ReactLenisProps {
	children: ReactNode;
	root?: boolean;
	[key: string]: unknown;
}

type UseLenisHook = (
	callback?: (lenis: {
		scrollTo: (target: number, options?: { immediate?: boolean }) => void;
	}) => void
) =>
	| { scrollTo: (target: number, options?: { immediate?: boolean }) => void }
	| undefined;

function ScrollToTop({ useLenis }: { useLenis: UseLenisHook }) {
	const pathname = usePathname();
	const lenis = useLenis();
	const lenisRef = useRef(lenis);
	lenisRef.current = lenis;
	const previousPathnameRef = useRef(pathname);
	const isFirstRender = useRef(true);
	const isPopstateNav = useRef(false);

	useEffect(() => {
		const handlePopstate = () => {
			isPopstateNav.current = true;
			// Reset after the current event loop so the pathname effect can
			// consume the flag, but it doesn't leak into future navigations
			// when popstate fires without a pathname change.
			requestAnimationFrame(() => {
				isPopstateNav.current = false;
			});
		};
		window.addEventListener('popstate', handlePopstate);
		return () => window.removeEventListener('popstate', handlePopstate);
	}, []);

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
			previousPathnameRef.current = pathname;
			return;
		}
		if (previousPathnameRef.current === pathname) {
			return;
		}
		previousPathnameRef.current = pathname;
		if (isPopstateNav.current) {
			isPopstateNav.current = false;
			return;
		}
		lenisRef.current?.scrollTo(0, { immediate: true });
	}, [pathname]);

	return null;
}

export function ReactLenis({ children, ...props }: ReactLenisProps) {
	const [LenisComponent, setLenisComponent] =
		useState<ComponentType<ReactLenisProps> | null>(null);
	const [lenisHook, setLenisHook] = useState<UseLenisHook | null>(null);

	useEffect(() => {
		let isMounted = true;
		import('lenis/react')
			.then((mod) => {
				if (isMounted) {
					setLenisComponent(
						() => mod.ReactLenis as ComponentType<ReactLenisProps>
					);
					setLenisHook(() => mod.useLenis as UseLenisHook);
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

	return (
		<LenisComponent {...props}>
			{lenisHook && <ScrollToTop useLenis={lenisHook} />}
			{children}
		</LenisComponent>
	);
}
