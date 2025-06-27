const rewrites = async () => {
	return [
		{
			source: '/plausible/js/script.js',
			destination: 'https://plausible.io/js/script.js',
		},
		{
			source: '/plausible/js/plausible.hash.local.outbound-links.js',
			destination:
				'https://plausible.io/js/plausible.hash.local.outbound-links.js',
		},
		{
			source:
				'/plausible/js/plausible.file-downloads.hash.local.outbound-links.js',
			destination:
				'https://plausible.io/js/plausible.file-downloads.hash.local.outbound-links.js',
		},
		{
			source:
				'/plausible/js/plausible.file-downloads.hash.local.outbound-links.tagged-events.js',
			destination:
				'https://plausible.io/js/plausible.file-downloads.hash.local.outbound-links.tagged-events.js',
		},
		{
			source:
				'/plausible/js/script.file-downloads.hash.local.outbound-links.pageview-props.tagged-events.js',
			destination:
				'https://plausible.io/js/script.file-downloads.hash.local.outbound-links.pageview-props.tagged-events.js',
		},
		{
			source: '/api/event',
			destination: 'https://plausible.io/api/event',
		},
	];
};

export default rewrites;
