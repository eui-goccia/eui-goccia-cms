export function EventDetailSkeleton() {
	return (
		<output aria-label='Loading event'>
			<div className='min-h-screen bg-blu-300 animate-pulse px-5 pt-24 lg:px-10'>
				<div className='h-8 bg-gray-200 rounded w-1/4 mb-8' />
				<div className='aspect-4/3 max-w-2xl bg-gray-200 rounded-[30px]' />
			</div>
		</output>
	);
}
