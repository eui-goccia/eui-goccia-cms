'use client';

import { cn } from '@/modules/utilities/cnUtils';

interface FilterGroup {
	label: string;
	options: string[];
}

interface FilterSidebarProps {
	groups: FilterGroup[];
	activeFilters: Record<string, string[]>;
	onToggleFilter: (group: string, value: string) => void;
}

export function FilterSidebar({
	groups,
	activeFilters,
	onToggleFilter,
}: FilterSidebarProps) {
	return (
		<aside className='w-full lg:w-[250px] lg:shrink-0'>
			<div className='flex flex-col gap-6'>
				{groups.map((group) => (
					<div key={group.label}>
						<p className='mb-2 font-greed text-lg font-bold uppercase tracking-wide'>
							{group.label}
						</p>
						<div className='flex flex-wrap gap-2.5'>
							{group.options.map((option) => {
								const isActive =
									activeFilters[group.label]?.includes(option);
								return (
									<button
										className={cn(
											'font-greed text-lg uppercase tracking-wide transition-all',
											isActive
												? 'font-bold underline decoration-rosso-500 decoration-2 underline-offset-4'
												: 'hover:underline hover:decoration-rosso-500 hover:decoration-2 hover:underline-offset-4'
										)}
										key={option}
										onClick={() => onToggleFilter(group.label, option)}
										type='button'
									>
										{option}
									</button>
								);
							})}
						</div>
					</div>
				))}
			</div>
		</aside>
	);
}
