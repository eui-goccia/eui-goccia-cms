export function SectionSkeleton() {
	return (
		<div className='w-full py-16 px-5 lg:px-10'>
			<div className='animate-pulse space-y-4'>
				<div className='h-8 bg-gray-200 rounded w-1/4' />
				<div className='space-y-3'>
					<div className='h-4 bg-gray-200 rounded w-3/4' />
					<div className='h-4 bg-gray-200 rounded w-1/2' />
					<div className='h-4 bg-gray-200 rounded w-2/3' />
				</div>
			</div>
		</div>
	);
}
