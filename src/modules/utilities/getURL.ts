import canUseDOM from './canUseDOM';

export const getServerSideURL = () => {
	let url =
		process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL ??
		process.env.NEXT_PUBLIC_VERCEL_URL ??
		process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL;

	if (!url) {
		url = 'http://localhost:3000';
	}

	return url;
};

export const getClientSideURL = () => {
	if (canUseDOM) {
		const protocol = window.location.protocol;
		const domain = window.location.hostname;
		const port = window.location.port;

		return `${protocol}//${domain}${port ? `:${port}` : ''}`;
	}

	return (
		process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL ??
		process.env.NEXT_PUBLIC_VERCEL_URL ??
		process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL ??
		'http://localhost:3000'
	);
};
