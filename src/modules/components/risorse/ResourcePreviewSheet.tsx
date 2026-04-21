'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { CustomImage } from '@/modules/components/CustomImage';
import type { ResolvedResource } from '@/modules/resources/queries';

interface ResourcePreviewSheetProps {
	onClose: () => void;
	resource: ResolvedResource | null;
}

export function ResourcePreviewSheet({
	onClose,
	resource,
}: ResourcePreviewSheetProps) {
	const t = useTranslations('resourcesPage');

	if (!resource) {
		return null;
	}

	const previewImage = resource.gallery[0];

	return (
		<div className='fixed inset-0 z-50'>
			<button
				aria-label={t('closePreview')}
				className='absolute inset-0 bg-black/35 backdrop-blur-[2px]'
				onClick={onClose}
				type='button'
			/>
			<aside className='absolute inset-x-0 bottom-0 flex max-h-[88svh] flex-col overflow-hidden rounded-t-[34px] border border-black/15 bg-blu-300 shadow-[0_-24px_80px_rgba(0,0,0,0.18)] lg:inset-y-6 lg:right-6 lg:left-auto lg:w-[480px] lg:rounded-[34px]'>
				<div className='flex items-center justify-between border-b border-black/10 px-6 py-4'>
					<p className='font-greed text-sm uppercase tracking-[0.12em] text-black/65'>
						{t('preview')}
					</p>
					<button
						className='rounded-full border border-black/15 px-3 py-1 font-greed text-sm uppercase tracking-[0.08em] text-black transition-colors hover:border-rosso-500 hover:text-rosso-500'
						onClick={onClose}
						type='button'
					>
						{t('closePreview')}
					</button>
				</div>

				<div className='overflow-y-auto px-6 py-6'>
					<div className='space-y-6'>
						<div className='space-y-3'>
							<p className='font-greed text-sm uppercase tracking-[0.14em] text-rosso-500'>
								{resource.dateLabel}
							</p>
							<h2 className='font-greed text-[2.35rem] font-bold leading-[0.92] tracking-tight text-black'>
								{resource.title}
							</h2>
						</div>

						<div className='flex flex-wrap gap-2'>
							{resource.workPackageLabel ? (
								<span className='rounded-full border border-black/10 bg-white/60 px-3 py-1 font-greed text-sm uppercase tracking-[0.08em] text-black/80'>
									{resource.workPackageLabel}
								</span>
							) : null}
							{resource.partnerName ? (
								<span className='rounded-full border border-black/10 bg-white/60 px-3 py-1 font-greed text-sm uppercase tracking-[0.08em] text-black/80'>
									{resource.partnerName}
								</span>
							) : null}
							{resource.tags.map((tag) => (
								<span
									className='rounded-full border border-black/10 bg-white/60 px-3 py-1 font-greed text-sm uppercase tracking-[0.08em] text-black/70'
									key={tag.id}
								>
									{tag.name}
								</span>
							))}
						</div>

						{previewImage ? (
							<div className='overflow-hidden rounded-[26px]'>
								<CustomImage
									className='aspect-[1.1/1] object-cover'
									image={previewImage}
									size='large'
									sizes='(max-width: 1023px) 100vw, 480px'
								/>
							</div>
						) : null}

						{resource.descriptionExcerpt ? (
							<p className='max-w-xl font-greed text-xl leading-[1.08] tracking-[0.01em] text-black/82'>
								{resource.descriptionExcerpt}
							</p>
						) : null}

						<Link
							className='inline-flex items-center rounded-full bg-rosso-500 px-5 py-3 font-greed text-sm uppercase tracking-[0.12em] text-blu-300 transition-transform hover:-translate-y-0.5'
							href={`/risorse/${resource.slug}`}
						>
							{t('openFullPage')}
						</Link>
					</div>
				</div>
			</aside>
		</div>
	);
}
