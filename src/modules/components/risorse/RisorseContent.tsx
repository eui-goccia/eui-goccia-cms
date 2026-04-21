'use client';

import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { startTransition, useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter } from '@/i18n/routing';
import type { ResourceListingData } from '@/modules/resources/queries';
import { useDebounce } from '@/modules/utilities/useDebounce';
import { FilterSidebar } from './FilterSidebar';
import { ResourcePreviewSheet } from './ResourcePreviewSheet';
import { ResourceRow } from './ResourceRow';

function buildHref(pathname: string, params: URLSearchParams): string {
	const query = params.toString();
	return query ? `${pathname}?${query}` : pathname;
}

// Shared grid used by the column-header strip and each data row so they align.
// Columns (desktop): filters | TITOLO | DATA | KEYWORD | WP | +
const ROW_GRID =
	'lg:grid lg:grid-cols-[minmax(0,260px)_minmax(0,2.2fr)_130px_minmax(0,1.4fr)_90px_44px] lg:gap-x-6';

export function RisorseContent({
	filterOptions,
	filters,
	previewResource,
	resources,
}: ResourceListingData) {
	const t = useTranslations('resourcesPage');
	const pathname = usePathname();
	const router = useRouter();
	const searchParams = useSearchParams();
	const [searchValue, setSearchValue] = useState(filters.q ?? '');
	const debouncedSearch = useDebounce(searchValue, 250);

	useEffect(() => {
		setSearchValue(filters.q ?? '');
	}, [filters.q]);

	useEffect(() => {
		if (debouncedSearch === (filters.q ?? '')) {
			return;
		}

		const params = new URLSearchParams(searchParams.toString());
		const nextValue = debouncedSearch.trim();

		params.delete('preview');

		if (nextValue) {
			params.set('q', nextValue);
		} else {
			params.delete('q');
		}

		startTransition(() => {
			router.replace(buildHref(pathname, params));
		});
	}, [debouncedSearch, filters.q, pathname, router, searchParams]);

	const filterSidebarOptions = useMemo(
		() => ({
			workPackages: filterOptions.workPackages,
			tags: filterOptions.tags.map((tag) => ({
				label: tag.label,
				value: tag.slug,
			})),
			partners: filterOptions.partners,
			years: filterOptions.years.map((year) => ({ label: year, value: year })),
		}),
		[filterOptions]
	);

	const updateMultiValueFilter = (
		group: 'partner' | 'tag' | 'wp' | 'year',
		value: string
	) => {
		const params = new URLSearchParams(searchParams.toString());
		const current = params.getAll(group);
		const nextValues = current.includes(value)
			? current.filter((item) => item !== value)
			: [...current, value];

		params.delete(group);
		params.delete('preview');

		for (const nextValue of nextValues) {
			params.append(group, nextValue);
		}

		startTransition(() => {
			router.replace(buildHref(pathname, params));
		});
	};

	const openPreview = (slug: string) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set('preview', slug);

		startTransition(() => {
			router.replace(buildHref(pathname, params));
		});
	};

	const closePreview = () => {
		const params = new URLSearchParams(searchParams.toString());
		params.delete('preview');

		startTransition(() => {
			router.replace(buildHref(pathname, params));
		});
	};

	const resetFilters = () => {
		const params = new URLSearchParams(searchParams.toString());
		params.delete('q');
		params.delete('tag');
		params.delete('wp');
		params.delete('partner');
		params.delete('year');
		params.delete('preview');

		startTransition(() => {
			router.replace(buildHref(pathname, params));
		});
	};

	const headerLabelClass =
		'font-greed text-[13px] font-bold uppercase tracking-[0.08em] text-black';

	return (
		<>
			<section className='px-3 pt-2 pb-20 md:px-5'>
				{/* Hero banner */}
				<div className='relative overflow-hidden rounded-[28px] bg-blu-500 px-6 pt-6 pb-3 md:px-10 md:pt-10'>
					<h1 className='font-ghost varW600 whitespace-nowrap text-[clamp(3.25rem,13vw,12.5rem)] leading-[0.82] tracking-[-0.01em] uppercase text-blu-300/90'>
						{t('archiveTitle')}
					</h1>

					<label className='sr-only' htmlFor='resource-search'>
						{t('searchTitle')}
					</label>
					<input
						className='absolute top-5 right-6 w-[220px] rounded-full border border-blu-300/40 bg-transparent px-4 py-1.5 font-greed text-sm uppercase tracking-[0.12em] text-blu-300 outline-none placeholder:text-blu-300/60 focus:border-blu-300'
						id='resource-search'
						onChange={(event) => setSearchValue(event.target.value)}
						placeholder={t('searchPlaceholder')}
						type='search'
						value={searchValue}
					/>
				</div>

				{/* Column header strip (orange bar) */}
				<div
					className={`mt-3 rounded-[10px] bg-rosso-500 px-5 py-3 md:px-7 ${ROW_GRID}`}
				>
					<p className={headerLabelClass}>{t('filters')}</p>
					<p className={`hidden lg:block ${headerLabelClass}`}>
						{t('searchTitle')}
					</p>
					<p className={`hidden lg:block ${headerLabelClass}`}>{t('date')}</p>
					<p className={`hidden lg:block ${headerLabelClass}`}>
						{t('keywords')}
					</p>
					<p className={`hidden lg:block ${headerLabelClass}`}>
						{t('keywords')}
					</p>
					<span />
				</div>

				{/* Filters + rows body — same column padding so columns line up with the orange strip above */}
				<div className={`px-5 pt-6 md:px-7 ${ROW_GRID}`}>
					<FilterSidebar
						activeFilters={{
							wp: filters.wp,
							tag: filters.tag,
							partner: filters.partner,
							year: filters.year,
						}}
						onReset={resetFilters}
						onToggleFilter={updateMultiValueFilter}
						options={filterSidebarOptions}
					/>

					<div className='lg:col-span-5'>
						{resources.length > 0 ? (
							<ul className='flex flex-col'>
								{resources.map((resource) => (
									<ResourceRow
										key={resource.id}
										onOpenPreview={openPreview}
										resource={resource}
									/>
								))}
							</ul>
						) : (
							<p className='py-20 text-center font-greed text-2xl tracking-[0.03em] text-black/45'>
								{t('noResults')}
							</p>
						)}
					</div>
				</div>
			</section>

			<ResourcePreviewSheet onClose={closePreview} resource={previewResource} />
		</>
	);
}
