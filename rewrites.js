const rewrites = async () => [
	{
		source: '/plausible/js/script.file-downloads.outbound-links.js',
		destination:
			'https://plausible.net-work.studio/js/script.file-downloads.outbound-links.js',
	},
	{
		source: '/plausible/api/event',
		destination: 'https://plausible.net-work.studio/api/event',
	},
];

export default rewrites;
