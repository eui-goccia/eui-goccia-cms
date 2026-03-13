import Script from 'next/script';

export const PlausibleAnalytics = () => (
	<Script
		data-api="/pxe/api/event"
		data-domain="eui-goccia.eu"
		defer
		src="/pxe/js/script.js"
		strategy="afterInteractive"
	/>
);
