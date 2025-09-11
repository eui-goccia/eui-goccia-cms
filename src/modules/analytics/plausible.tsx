'use client';
import { usePathname } from 'next/navigation';
import PlausibleProvider from 'next-plausible';
import { getClientSideURL } from '../utilities/getURL';

export const Plausible = ({ children }: { children: React.ReactNode }) => {
	const pathname = usePathname();
	return (
		<PlausibleProvider
			customDomain={`${getClientSideURL()}/plausible`}
			domain={'eui-goccia.eu'}
			enabled={true}
			hash={true}
			pageviewProps={{
				user: 'unauthenticated',
				path: pathname,
			}}
			revenue={false}
			selfHosted={false}
			taggedEvents={true}
			trackFileDownloads={true}
			trackLocalhost={false}
			trackOutboundLinks={true}
		>
			{children}
		</PlausibleProvider>
	);
};
