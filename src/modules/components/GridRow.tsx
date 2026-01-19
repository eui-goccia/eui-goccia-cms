import type { ReactNode } from 'react';
import { cn } from '@/modules/utilities/cnUtils';

interface GridRowProps {
	children: ReactNode;
	customClass?: string;
	invertOrder?: boolean;
}

export default function GridRow({
	customClass,
	children,
	invertOrder = false,
}: GridRowProps) {
	return (
		<div
			className={cn(
				'flex flex-col lg:grid grid-cols-2 gap-0',
				invertOrder ? 'flex-col-reverse' : null,
				customClass
			)}
		>
			{children}
		</div>
	);
}
