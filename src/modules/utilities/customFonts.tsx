import localFont from 'next/font/local';

/* Titles */
const tagada = localFont({
	src: '../../assets/fonts/Tagada-Regular-SVG.woff2',
	variable: '--font-tagada',
});

/* Subtitle */
const ghost = localFont({
	src: '../../assets/fonts/GhostriteVF.woff',
	variable: '--font-ghost',
});

/* Text */
const greed = localFont({
	src: [
		{
			path: '../../assets/fonts/GreedNarrow-Regular.woff2',
			weight: '400',
			style: 'normal',
		},
		{
			path: '../../assets/fonts/GreedNarrow-Bold.woff2',
			weight: '700',
			style: 'normal',
		},
	],
	variable: '--font-greed',
});

export { tagada, ghost, greed };
