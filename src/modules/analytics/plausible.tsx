'use client';

import PlausibleProvider from 'next-plausible';
import type { ReactNode } from 'react';
import { getClientSideURL } from '../utilities/getURL';

export const PlausibleProviderWrapper = ({
	children,
}: {
	children: ReactNode;
}) => (
	<PlausibleProvider
		customDomain={`${getClientSideURL()}/plausible`}
		domain={'eui-goccia.eu'}
		enabled={true}
		hash={true}
		pageviewProps={{
			user: 'unauthenticated',
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
