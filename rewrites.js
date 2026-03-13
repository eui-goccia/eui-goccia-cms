const rewrites = async () => ({
	beforeFiles: [
		{
			source: '/pxe/js/script.js',
			destination:
				'https://plausible.net-work.studio/js/script.file-downloads.outbound-links.js',
		},
		{
			source: '/pxe/api/event',
			destination: 'https://plausible.net-work.studio/api/event',
		},
		{
			source: '/:locale/pxe/api/event',
			destination: 'https://plausible.net-work.studio/api/event',
		},
	],
});

export default rewrites;
