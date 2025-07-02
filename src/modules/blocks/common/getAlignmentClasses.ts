import type { TextBlock } from '@payload-types';
import { cn } from '@/modules/utilities/cnUtils';

type AlignmentProps = Pick<TextBlock, 'vertical' | 'horizontal'>;

export const getAlignmentClasses = ({
	vertical,
	horizontal,
}: AlignmentProps): string => {
	const verticalClasses = {
		top: 'items-start',
		center: 'items-center',
		bottom: 'items-end',
	};

	const horizontalClasses = {
		left: 'justify-start text-left',
		center: 'justify-center text-center',
		right: 'justify-end text-right',
	};

	const vClass = vertical ? verticalClasses[vertical] : 'items-start';
	const hClass = horizontal ? horizontalClasses[horizontal] : 'justify-start';

	return cn('flex', vClass, hClass);
};
