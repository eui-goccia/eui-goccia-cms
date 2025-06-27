import type { ReactNode } from 'react';
import { cn } from '@/modules/utilities/cnUtils';

interface TextProps {
	children: ReactNode;
	customClass?: string;
}

export default function BlockText({ children, customClass }: TextProps) {
	return (
		<p
			className={cn(
				'font-greed tracking-[0.01em] text-xl md:text-2xl',
				customClass
			)}
		>
			{children}
		</p>
	);
}
