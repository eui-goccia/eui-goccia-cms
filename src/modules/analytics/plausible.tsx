'use client';
import { usePathname } from 'next/navigation';
import PlausibleProvider from 'next-plausible';

export const Plausible = ({ children }: { children: React.ReactNode }) => {
	const pathname = usePathname();
	return (
		<PlausibleProvider
			enabled={true}
			customDomain={`${process.env.NEXT_PUBLIC_URL}/plausible`}
			domain={'eui-goccia.eu'}
			selfHosted={false}
			hash={true}
			revenue={false}
			taggedEvents={true}
			trackLocalhost={true}
			trackFileDownloads={true}
			trackOutboundLinks={true}
			pageviewProps={{
				user: 'unauthenticated',
				path: pathname,
			}}
		>
			{children}
		</PlausibleProvider>
	);
};
