import canUseDOM from './canUseDOM';

const LOCALHOST_URL = 'http://localhost:3000';
const PROTOCOL_PATTERN = /^https?:\/\//i;
const TRAILING_SLASH_PATTERN = /\/+$/;

function normalizeURL(url: string | undefined): string | undefined {
	const trimmedURL = url?.trim();

	if (!trimmedURL) {
		return undefined;
	}

	if (PROTOCOL_PATTERN.test(trimmedURL)) {
		return trimmedURL.replace(TRAILING_SLASH_PATTERN, '');
	}

	if (
		trimmedURL.startsWith('localhost') ||
		trimmedURL.startsWith('127.0.0.1')
	) {
		return `http://${trimmedURL}`.replace(TRAILING_SLASH_PATTERN, '');
	}

	return `https://${trimmedURL}`.replace(TRAILING_SLASH_PATTERN, '');
}

function getRuntimeURL() {
	return (
		normalizeURL(process.env.NEXT_PUBLIC_SITE_URL) ??
		normalizeURL(process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL) ??
		normalizeURL(process.env.NEXT_PUBLIC_VERCEL_URL) ??
		normalizeURL(process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL) ??
		LOCALHOST_URL
	);
}

export const getServerSideURL = () => {
	return getRuntimeURL();
};

export const getClientSideURL = () => {
	if (canUseDOM) {
		const protocol = window.location.protocol;
		const domain = window.location.hostname;
		const port = window.location.port;

		return `${protocol}//${domain}${port ? `:${port}` : ''}`;
	}

	return getRuntimeURL();
};
