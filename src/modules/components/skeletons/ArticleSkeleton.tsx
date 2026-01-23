export function ArticleSkeleton() {
	return (
		<output aria-label='Loading article'>
			{/* Header skeleton */}
			<div className='h-[60vh] bg-gray-200 animate-pulse' />

			{/* Content skeleton */}
			<div className='px-5 lg:px-10 pb-30 grid grid-cols-12 gap-5 bg-blu-300'>
				<div className='col-start-1 2xl:col-start-2 hidden lg:inline col-span-4 2xl:col-span-3' />
				<article className='col-start-1 lg:col-start-5 col-span-full lg:col-span-8 xl:col-span-7 flex flex-col gap-10 pt-28 lg:pt-32 xl:pt-48'>
					<div className='animate-pulse space-y-6'>
						<div className='h-6 bg-gray-200 rounded w-3/4' />
						<div className='space-y-3'>
							<div className='h-4 bg-gray-200 rounded w-full' />
							<div className='h-4 bg-gray-200 rounded w-full' />
							<div className='h-4 bg-gray-200 rounded w-2/3' />
						</div>
						<div className='space-y-3'>
							<div className='h-4 bg-gray-200 rounded w-full' />
							<div className='h-4 bg-gray-200 rounded w-5/6' />
							<div className='h-4 bg-gray-200 rounded w-full' />
						</div>
					</div>
				</article>
			</div>
		</output>
	);
}
