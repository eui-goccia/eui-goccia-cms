import type { ReactNode } from 'react';
import { cn } from '@/modules/utilities/cnUtils';

interface ParagraphProps {
	children: ReactNode;
	customClass?: string;
}

export default function BlockParagraph({
	children,
	customClass,
}: ParagraphProps) {
	return (
		<div className={cn('flex flex-col gap-2.5 md:gap-5', customClass)}>
			{children}
		</div>
	);
}
