'use client';

import { useTranslations } from 'next-intl';
import { cn } from '@/modules/utilities/cnUtils';

interface FilterOption {
	label: string;
	value: string;
}

interface FilterSidebarProps {
	activeFilters: {
		partner: string[];
		tag: string[];
		wp: string[];
		year: string[];
	};
	onToggleFilter: (
		group: 'partner' | 'tag' | 'wp' | 'year',
		value: string
	) => void;
	options: {
		partners: FilterOption[];
		tags: { label: string; value: string }[];
		workPackages: FilterOption[];
		years: FilterOption[];
	};
	onReset: () => void;
}

function FilterGroup({
	activeValues,
	label,
	onToggle,
	options,
}: {
	activeValues: string[];
	label: string;
	onToggle: (value: string) => void;
	options: FilterOption[];
}) {
	if (options.length === 0) {
		return null;
	}

	return (
		<div>
			<p className='mb-2 font-greed text-[13px] font-bold uppercase tracking-[0.06em] text-black'>
				{label}
			</p>
			<div className='flex flex-wrap gap-x-4 gap-y-1'>
				{options.map((option) => {
					const isActive = activeValues.includes(option.value);

					return (
						<button
							className={cn(
								'cursor-pointer font-greed text-[13px] uppercase tracking-[0.04em] transition-colors',
								isActive
									? 'text-rosso-500 underline decoration-rosso-500 decoration-2 underline-offset-[5px]'
									: 'text-black hover:text-rosso-500'
							)}
							key={option.value}
							onClick={() => onToggle(option.value)}
							type='button'
						>
							{option.label.toUpperCase()}
						</button>
					);
				})}
			</div>
		</div>
	);
}

export function FilterSidebar({
	activeFilters,
	onReset,
	onToggleFilter,
	options,
}: FilterSidebarProps) {
	const t = useTranslations('resourcesPage');
	const hasActiveFilters = Object.values(activeFilters).some(
		(values) => values.length > 0
	);

	return (
		<aside className='pt-5 pr-4 pl-1 lg:sticky lg:top-28 lg:self-start'>
			{hasActiveFilters ? (
				<button
					className='mb-5 cursor-pointer font-greed text-[11px] uppercase tracking-[0.1em] text-rosso-500 underline underline-offset-4'
					onClick={onReset}
					type='button'
				>
					{t('clearFilters')}
				</button>
			) : null}
			<div className='space-y-6'>
				<FilterGroup
					activeValues={activeFilters.tag}
					label={t('paroleChiave')}
					onToggle={(value) => onToggleFilter('tag', value)}
					options={options.tags}
				/>
				<FilterGroup
					activeValues={activeFilters.wp}
					label={t('workPackage')}
					onToggle={(value) => onToggleFilter('wp', value)}
					options={options.workPackages}
				/>
				<FilterGroup
					activeValues={activeFilters.year}
					label={t('year')}
					onToggle={(value) => onToggleFilter('year', value)}
					options={options.years}
				/>
				<FilterGroup
					activeValues={activeFilters.partner}
					label={t('altro')}
					onToggle={(value) => onToggleFilter('partner', value)}
					options={options.partners}
				/>
			</div>
		</aside>
	);
}
