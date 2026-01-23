export function CardSkeleton() {
	return (
		<div className='break-inside-avoid-column mb-4'>
			<div className='animate-pulse bg-white rounded-lg overflow-hidden'>
				<div className='h-48 bg-gray-200' />
				<div className='p-4 space-y-3'>
					<div className='h-4 bg-gray-200 rounded w-3/4' />
					<div className='h-3 bg-gray-200 rounded w-1/2' />
				</div>
			</div>
		</div>
	);
}

export function CardGridSkeleton({ count = 6 }: { count?: number }) {
	return (
		<>
			{Array.from({ length: count }).map((_, i) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: static skeleton elements don't reorder
				<CardSkeleton key={i} />
			))}
		</>
	);
}
