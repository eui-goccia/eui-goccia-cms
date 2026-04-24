import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { CustomImage } from '@/modules/components/CustomImage';
import RichText from '@/modules/editor/component';
import type { ResolvedResource } from '@/modules/resources/queries';

interface ResourceDetailProps {
	locale: string;
	resource: ResolvedResource;
}

export async function ResourceDetail({
	locale,
	resource,
}: ResourceDetailProps) {
	const t = await getTranslations({ locale, namespace: 'resourcesPage' });
	const heroImage = resource.gallery[0];
	const partnerLine =
		resource.partnerName?.toUpperCase() ?? t('partner').toUpperCase();

	return (
		<article className='px-5 pt-12 pb-24 md:px-10 lg:px-16'>
			<div className='grid gap-x-8 gap-y-10 lg:grid-cols-[52px_minmax(0,1fr)_260px]'>
				{/* Back button */}
				<Link
					aria-label={t('backToResources')}
					className='flex size-[52px] items-center justify-center rounded-[14px] border border-black/80 text-black transition-colors hover:border-rosso-500 hover:text-rosso-500'
					href='/risorse'
				>
					<svg
						aria-hidden='true'
						fill='none'
						focusable='false'
						height='18'
						viewBox='0 0 18 18'
						width='18'
					>
						<path
							d='M11.5 4L6 9l5.5 5'
							stroke='currentColor'
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='1.8'
						/>
					</svg>
				</Link>

				{/* Title */}
				<h1 className='font-greed max-w-[32ch] text-[clamp(1.6rem,3.2vw,2.6rem)] font-bold leading-[1.1] tracking-[-0.01em] text-black lg:col-start-2'>
					{resource.title}
				</h1>
				<div className='hidden lg:block' />

				{/* Meta row */}
				<div className='lg:col-start-2'>
					<div className='mb-6 h-[10px] w-[100px] bg-rosso-500' />
					<div className='flex flex-wrap items-baseline gap-x-10 gap-y-3 font-ghost uppercase text-black'>
						{resource.dateLabel ? (
							<span className='text-[1.4rem] tracking-[0.02em]'>
								{resource.dateLabel}
							</span>
						) : null}
						{resource.workPackageLabel ? (
							<span className='text-[1.4rem] tracking-[0.02em]'>
								{resource.workPackageLabel}
							</span>
						) : null}
						<span className='text-[1.4rem] tracking-[0.02em]'>
							{partnerLine}
						</span>
					</div>
				</div>

				{/* Data points */}
				{resource.dataPoints.length > 0 ? (
					<div className='lg:col-start-3'>
						<div className='mb-6 h-[10px] w-[200px] bg-rosso-500' />
						<ul className='space-y-2 font-ghost uppercase text-black'>
							{resource.dataPoints.map((value) => (
								<li className='text-[1.4rem] tracking-[0.02em]' key={value}>
									{value}
								</li>
							))}
						</ul>
					</div>
				) : (
					<div className='hidden lg:block' />
				)}

				{/* Body */}
				{resource.description ? (
					<div className='max-w-[72ch] font-greed text-[15px] leading-[1.55] tracking-[0.005em] text-black lg:col-start-2'>
						<RichText data={resource.description} enableGutter={false} />
					</div>
				) : null}

				{/* Hero image */}
				{heroImage ? (
					<figure className='mt-4 overflow-hidden rounded-[10px] lg:col-start-2 lg:max-w-[620px]'>
						<CustomImage
							className='aspect-[4/5] w-full object-cover'
							image={heroImage}
							size='large'
							sizes='(max-width: 1023px) 100vw, 620px'
						/>
					</figure>
				) : null}

				{/* Additional gallery images */}
				{resource.gallery.slice(1).length > 0 ? (
					<section className='grid gap-6 md:grid-cols-2 lg:col-span-3'>
						{resource.gallery.slice(1).map((image) => (
							<figure className='overflow-hidden rounded-[10px]' key={image.id}>
								<CustomImage
									className='aspect-[4/3] w-full object-cover'
									image={image}
									size='large'
									sizes='(max-width: 767px) 100vw, 48vw'
								/>
							</figure>
						))}
					</section>
				) : null}

				{/* Document updates */}
				{resource.documentUpdates.length > 0 ? (
					<section className='lg:col-span-3'>
						<div className='mb-6 flex items-center gap-4'>
							<div className='h-[10px] w-[100px] bg-rosso-500' />
							<h2 className='font-greed text-xl font-bold uppercase tracking-[0.06em] text-black'>
								{t('documentUpdates')}
							</h2>
						</div>
						<div className='divide-y divide-black/15'>
							{resource.documentUpdates.map((update) => (
								<div
									className='grid gap-3 py-5 md:grid-cols-[140px_minmax(0,1fr)_auto]'
									key={update.id}
								>
									<p className='font-ghost text-base uppercase tracking-[0.04em] text-black'>
										{update.dateLabel}
									</p>
									<div className='space-y-1.5'>
										<p className='font-greed text-lg font-bold leading-[1.15] tracking-[0.005em] text-black'>
											{update.title}
										</p>
										{update.description ? (
											<p className='font-greed text-sm leading-[1.4] tracking-[0.005em] text-black/75'>
												{update.description}
											</p>
										) : null}
									</div>
									{update.url ? (
										<Link
											className='self-start rounded-full border border-black/20 px-4 py-2 font-greed text-xs uppercase tracking-[0.1em] text-black transition-colors hover:border-rosso-500 hover:text-rosso-500'
											href={update.url}
										>
											{update.ctaLabel || t('openFullPage')}
										</Link>
									) : null}
								</div>
							))}
						</div>
					</section>
				) : null}
			</div>
		</article>
	);
}
