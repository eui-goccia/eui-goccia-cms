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
	onSearchChange: (value: string) => void;
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
	searchValue: string;
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
	onSearchChange,
	onToggleFilter,
	options,
	searchValue,
}: FilterSidebarProps) {
	const t = useTranslations('resourcesPage');
	const hasActiveFilters =
		searchValue.trim() !== '' ||
		Object.values(activeFilters).some((values) => values.length > 0);

	return (
		<aside className='pt-5 pr-4 pl-1 lg:sticky lg:top-28 lg:self-start'>
			<div className='mb-5'>
				<label className='sr-only' htmlFor='resource-search'>
					{t('searchTitle')}
				</label>
				<input
					className='w-full border-b border-black/30 bg-transparent pb-1.5 font-greed text-[13px] uppercase tracking-[0.04em] text-black outline-none placeholder:text-black/40 focus:border-rosso-500'
					id='resource-search'
					onChange={(event) => onSearchChange(event.target.value)}
					placeholder={t('searchPlaceholder')}
					type='search'
					value={searchValue}
				/>
			</div>
			{/* Always rendered to preserve vertical space and avoid layout shift when filters become active. */}
			<button
				aria-hidden={!hasActiveFilters}
				className={cn(
					'mb-5 cursor-pointer font-greed text-[11px] uppercase tracking-[0.1em] text-rosso-500 underline underline-offset-4',
					!hasActiveFilters && 'invisible'
				)}
				disabled={!hasActiveFilters}
				onClick={onReset}
				tabIndex={hasActiveFilters ? 0 : -1}
				type='button'
			>
				{t('clearFilters')}
			</button>
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
