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

function getVercelURL(name: string): string | undefined {
	return process.env[name] ?? process.env[`NEXT_PUBLIC_${name}`];
}

function getVercelEnvironment() {
	return getVercelURL('VERCEL_ENV');
}

function getPreviewRuntimeURL() {
	return (
		normalizeURL(getVercelURL('VERCEL_URL')) ??
		normalizeURL(getVercelURL('VERCEL_BRANCH_URL')) ??
		normalizeURL(getVercelURL('VERCEL_PROJECT_PRODUCTION_URL'))
	);
}

function getProductionRuntimeURL() {
	return (
		normalizeURL(getVercelURL('VERCEL_PROJECT_PRODUCTION_URL')) ??
		normalizeURL(getVercelURL('VERCEL_URL')) ??
		normalizeURL(getVercelURL('VERCEL_BRANCH_URL'))
	);
}

function isString(value: string | undefined): value is string {
	return typeof value === 'string';
}

function getRuntimeURL() {
	const siteURL = normalizeURL(process.env.NEXT_PUBLIC_SITE_URL);

	if (siteURL) {
		return siteURL;
	}

	if (getVercelEnvironment() === 'preview') {
		return getPreviewRuntimeURL() ?? LOCALHOST_URL;
	}

	return getProductionRuntimeURL() ?? LOCALHOST_URL;
}

export function getServerSideOrigins() {
	const isPreview = getVercelEnvironment() === 'preview';
	const origins = [
		getRuntimeURL(),
		normalizeURL(getVercelURL('VERCEL_URL')),
		normalizeURL(getVercelURL('VERCEL_BRANCH_URL')),
		isPreview
			? undefined
			: normalizeURL(getVercelURL('VERCEL_PROJECT_PRODUCTION_URL')),
	];

	return Array.from(new Set(origins.filter(isString)));
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
