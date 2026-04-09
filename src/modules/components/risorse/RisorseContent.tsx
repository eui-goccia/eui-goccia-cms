'use client';

import { useMemo, useState } from 'react';
import { FilterSidebar } from './FilterSidebar';
import { ResourceRow } from './ResourceRow';
import { FILTER_GROUPS, MOCK_RESOURCES } from './resourceData';

export function RisorseContent() {
	const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>(
		{}
	);

	const handleToggleFilter = (group: string, value: string) => {
		setActiveFilters((prev) => {
			const current = prev[group] ?? [];
			const isActive = current.includes(value);
			return {
				...prev,
				[group]: isActive
					? current.filter((v) => v !== value)
					: [...current, value],
			};
		});
	};

	const filteredResources = useMemo(() => {
		const keywordFilters = activeFilters['PAROLA CHIAVE'] ?? [];
		const typeFilters = activeFilters['TIPO DI DOCUMENTO'] ?? [];
		const yearFilters = activeFilters.ANNO ?? [];

		return MOCK_RESOURCES.filter((resource) => {
			if (
				keywordFilters.length > 0 &&
				!resource.keywords.some((k) => keywordFilters.includes(k))
			) {
				return false;
			}
			if (typeFilters.length > 0 && !typeFilters.includes(resource.fileType)) {
				return false;
			}
			if (yearFilters.length > 0 && !yearFilters.includes(resource.year)) {
				return false;
			}
			return true;
		});
	}, [activeFilters]);

	return (
		<section className='flex flex-col gap-8 px-5 py-10 md:px-10 lg:flex-row lg:px-20'>
			<FilterSidebar
				activeFilters={activeFilters}
				groups={FILTER_GROUPS}
				onToggleFilter={handleToggleFilter}
			/>
			<div className='flex flex-1 flex-col'>
				{filteredResources.length > 0 ? (
					filteredResources.map((resource) => (
						<ResourceRow
							date={resource.date}
							description={resource.description}
							key={resource.id}
							reference={resource.reference}
							secondaryDescription={resource.secondaryDescription}
							slug={resource.slug}
						/>
					))
				) : (
					<p className='py-20 text-center font-greed text-2xl tracking-wide text-black/50'>
						Nessuna risorsa trovata
					</p>
				)}
			</div>
		</section>
	);
}
