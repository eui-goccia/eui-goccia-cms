import Script from 'next/script';

export const PlausibleAnalytics = () => (
	<Script
		data-api='/plausible/api/event'
		data-domain='eui-goccia.eu'
		defer
		src='/plausible/js/script.file-downloads.outbound-links.js'
		strategy='afterInteractive'
	/>
);
