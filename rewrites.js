const rewrites = async () => [
	{
		source: '/plausible/js/script.js',
		destination: 'http://plausible.net-work.studio/js/script.js',
	},
	{
		source: '/plausible/js/plausible.hash.outbound-links.js',
		destination:
			'http://plausible.net-work.studio/js/plausible.hash.outbound-links.js',
	},
	{
		source: '/plausible/js/plausible.file-downloads.hash.outbound-links.js',
		destination:
			'http://plausible.net-work.studio/js/plausible.file-downloads.hash.outbound-links.js',
	},
	{
		source:
			'/plausible/js/plausible.file-downloads.hash.outbound-links.tagged-events.js',
		destination:
			'http://plausible.net-work.studio/js/plausible.file-downloads.hash.outbound-links.tagged-events.js',
	},
	{
		source:
			'/plausible/js/script.file-downloads.hash.outbound-links.pageview-props.tagged-events.js',
		destination:
			'http://plausible.net-work.studio/js/script.file-downloads.hash.outbound-links.pageview-props.tagged-events.js',
	},
	{
		source: '/api/event',
		destination: 'http://plausible.net-work.studio/api/event',
	},
];

export default rewrites;
