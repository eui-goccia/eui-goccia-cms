import type { ResolvedResource } from '@/modules/resources/queries';

interface ResourceRowProps {
	onOpenPreview: (slug: string) => void;
	resource: ResolvedResource;
}

export function ResourceRow({ onOpenPreview, resource }: ResourceRowProps) {
	const keywordSummary =
		resource.descriptionExcerpt ||
		resource.tags.map((tag) => tag.name).join(', ');

	return (
		<li>
			<button
				className='group grid w-full cursor-pointer grid-cols-[1fr_32px] gap-x-4 gap-y-1 py-5 text-left text-black transition-colors hover:text-rosso-500 lg:grid-cols-[minmax(0,2.2fr)_130px_minmax(0,1.4fr)_90px_44px] lg:gap-x-6'
				onClick={() => onOpenPreview(resource.slug)}
				type='button'
			>
				<p className='max-w-[52ch] font-greed text-[14px] leading-[1.3] tracking-[0.005em]'>
					{resource.title}
				</p>
				<p className='font-greed text-[14px] leading-[1.3] tracking-[0.005em] lg:col-start-2'>
					{resource.dateLabel}
				</p>
				<p className='max-w-[36ch] font-greed text-[14px] leading-[1.3] tracking-[0.005em] lg:col-start-3'>
					{keywordSummary}
				</p>
				<p className='font-greed text-[14px] leading-[1.3] tracking-[0.005em] lg:col-start-4'>
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
