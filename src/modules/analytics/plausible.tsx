'use client';
import { usePathname } from 'next/navigation';
import PlausibleProvider from 'next-plausible';
import { Suspense } from 'react';
import { getClientSideURL } from '../utilities/getURL';

export const Plausible = ({ children }: { children: React.ReactNode }) => {
	const pathname = usePathname();
	return (
		<Suspense>
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
		</Suspense>
	);
};
