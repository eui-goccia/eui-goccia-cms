import type { ResolvedResource } from '@/modules/resources/queries';

interface ResourceRowProps {
	onOpenPreview: (slug: string) => void;
	resource: ResolvedResource;
}

export function ResourceRow({ onOpenPreview, resource }: ResourceRowProps) {
	const descriptionSummary =
		resource.descriptionExcerpt ||
		resource.tags.map((tag) => tag.name).join(', ');

	return (
		<li className='border-b border-black/10 last:border-b-0 lg:border-b-0'>
			<button
				className='group grid w-full cursor-pointer grid-cols-[1fr_32px] gap-x-4 gap-y-2 py-5 text-left text-black transition-colors hover:text-rosso-500 lg:grid-cols-[minmax(0,2.2fr)_130px_minmax(0,1.4fr)_90px_44px] lg:gap-x-6 lg:gap-y-1'
				onClick={() => onOpenPreview(resource.slug)}
				type='button'
			>
				<p className='max-w-[52ch] font-greed text-[15px] font-bold leading-[1.25] tracking-[0.005em] lg:text-[14px] lg:font-normal'>
					{resource.title}
				</p>

				{/* Mobile metadata line: date · WP (compact, muted). Spans both mobile columns so it isn't cramped next to the + icon column. */}
				<p className='col-span-2 flex flex-wrap items-center gap-x-2 font-greed text-[12px] uppercase tracking-[0.06em] text-black/60 lg:hidden'>
					<span>{resource.dateLabel}</span>
					{resource.workPackageLabel ? (
						<>
							<span aria-hidden='true'>·</span>
							<span>{resource.workPackageLabel}</span>
						</>
					) : null}
				</p>

				{/* Desktop-only date column. */}
				<p className='hidden font-greed text-[14px] leading-[1.3] tracking-[0.005em] lg:col-start-2 lg:block'>
					{resource.dateLabel}
				</p>

				<p className='col-span-2 line-clamp-3 font-greed text-[13px] leading-[1.35] tracking-[0.005em] text-black/75 lg:col-span-1 lg:col-start-3 lg:line-clamp-none lg:max-w-[36ch] lg:text-[14px] lg:text-black'>
					{descriptionSummary}
				</p>

				{/* Desktop-only WP column. */}
				<p className='hidden font-greed text-[14px] leading-[1.3] tracking-[0.005em] lg:col-start-4 lg:block'>
					{resource.workPackageLabel}
				</p>

				<span
					aria-hidden='true'
					className='col-start-2 row-start-1 justify-self-end self-start font-greed text-2xl leading-none transition-transform group-hover:rotate-45 lg:col-start-5'
				>
					+
				</span>
			</button>
		</li>
	);
}
