import { Link } from '@/i18n/routing';
import type { Resource } from './resourceData';

interface ResourceDetailProps {
	resource: Resource;
}

export function ResourceDetail({ resource }: ResourceDetailProps) {
	return (
		<div className='px-5 py-10 md:px-10 lg:px-20'>
			{/* Back Button */}
			<Link
				aria-label='Back to resources'
				className='mb-10 flex size-[45px] items-center justify-center rounded-[14px] border-2 border-black transition-colors hover:bg-black/5'
				href='/risorse'
			>
				<svg
					aria-hidden='true'
					className='-rotate-90'
					fill='none'
					focusable='false'
					height='20'
					viewBox='0 0 20 20'
					width='20'
				>
					<path d='M10 4L16 12H4L10 4Z' fill='currentColor' />
				</svg>
			</Link>

			{/* Title */}
			<h1 className='mb-10 max-w-[788px] font-greed text-[36px] font-bold leading-[1.1] tracking-wide underline opacity-80'>
				{resource.description}
			</h1>

			{/* Metadata Row */}
			<div className='mb-10 grid grid-cols-1 gap-8 lg:grid-cols-[3fr_2fr]'>
				{/* Left: Overview */}
				<div>
					<div className='mb-4 h-1 w-16 bg-rosso-500' />
					<p className='mb-4 font-greed text-lg font-bold uppercase tracking-wide underline decoration-rosso-500'>
						OVERVIEW
					</p>
					<div className='flex flex-wrap items-baseline gap-x-8 gap-y-2'>
						<span className='font-ghost text-[40px] uppercase tracking-wide'>
							{resource.date}
						</span>
						<span className='font-ghost text-[40px] uppercase tracking-wide'>
							{resource.reference}
						</span>
						<span className='font-ghost text-[40px] uppercase tracking-wide'>
							{resource.entity}
						</span>
					</div>
				</div>

				{/* Right: Highlights */}
				<div>
					<div className='mb-4 h-1 w-16 bg-rosso-500' />
					<p className='mb-4 font-greed text-lg font-bold uppercase tracking-wide underline decoration-rosso-500'>
						HIGHLIGHTS DELIVERABLE
					</p>
					<div className='flex flex-col gap-1'>
						{resource.highlights.map((highlight) => (
							<span
								className='font-ghost text-[40px] uppercase tracking-wide'
								key={highlight}
							>
								{highlight}
							</span>
						))}
					</div>
				</div>
			</div>

			{/* Body Text */}
			<div className='mb-10 max-w-[838px]'>
				{resource.body.map((paragraph) => (
					<p
						className='mb-5 font-greed text-2xl leading-[1.1] tracking-wide last:mb-0'
						key={`${resource.reference}-${paragraph}`}
					>
						{paragraph}
					</p>
				))}
			</div>

			{/* Image Placeholder */}
			{resource.imagePlaceholder && (
				<div className='mb-10 aspect-[4/3] max-w-[590px] rounded-[20px] bg-blu-500/20' />
			)}
		</div>
	);
}
