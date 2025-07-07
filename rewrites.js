const rewrites = async () => {
	return [
		{
			source: '/plausible/:path*',
			destination: 'https://plausible.io/:path*',
		},
		{
			source: '/api/event',
			destination: 'https://plausible.io/api/event',
		},
	];
};

export default rewrites;
