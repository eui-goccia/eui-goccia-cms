import type { SVGProps } from 'react';

const ArrowLeft = (props: SVGProps<SVGSVGElement>) => (
	<svg
		fill='none'
		height={19}
		viewBox='0 0 22 19'
		width={22}
		xmlns='http://www.w3.org/2000/svg'
		{...props}
	>
		<title>Arrow Left</title>
		<path
			d='M10.587 19q-2.583-2.874-5.024-4.838Q3.123 12.2 0 10.552V8.413Q3.087 6.8 5.527 4.838 7.967 2.909 10.587 0l1.651 1.542q-2.224 2.35-4.163 3.962a27 27 0 0 1-4.414 2.91H22v2.173H3.66q2.478 1.261 4.415 2.84 1.902 1.612 4.163 4.03z'
			fill='currentColor'
		/>
	</svg>
);
export default ArrowLeft;
