const rewrites = async () => [
	{
		source: '/plausible/js/script.file-downloads.outbound-links.js',
		destination:
			'http://plausible.net-work.studio/js/script.file-downloads.outbound-links.js',
	},
	{
		source: '/plausible/api/event',
		destination: 'http://plausible.net-work.studio/api/event',
	},
];

export default rewrites;
