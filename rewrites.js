const rewrites = async () => [
	{
		source:
			'/plausible/js/plausible.file-downloads.hash.outbound-links.pageview-props.tagged-events.js',
		destination:
			'https://plausible.net-work.studio/js/plausible.file-downloads.hash.outbound-links.pageview-props.tagged-events.js',
	},
	{
		source: '/api/event',
		destination: 'https://plausible.net-work.studio/api/event',
	},
];

export default rewrites;
