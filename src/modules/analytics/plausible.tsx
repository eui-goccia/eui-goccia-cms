'use client';
import { usePathname } from 'next/navigation';
import PlausibleProvider from 'next-plausible';
import { getClientSideURL } from '../utilities/getURL';

export const Plausible = ({ children }: { children: React.ReactNode }) => {
	const pathname = usePathname();
	return (
		<PlausibleProvider
			enabled={true}
			customDomain={`${getClientSideURL()}/plausible`}
			domain={'eui-goccia.eu'}
			selfHosted={false}
			hash={true}
			revenue={false}
			taggedEvents={true}
			trackLocalhost={false}
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
