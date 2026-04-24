'use client';

import { useEffect } from 'react';

interface ErrorProps {
	error: Error & { digest?: string };
	reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps) {
	useEffect(() => {
		console.error('Route error', { digest: error.digest });
	}, [error.digest]);

	return (
		<main className='min-h-screen flex items-center justify-center px-5'>
			<div className='text-center space-y-4'>
				<h1 className='text-2xl font-greed'>Something went wrong</h1>
				<p className='text-gray-600'>
					An unexpected error occurred. Please try again.
				</p>
				<button
					className='px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors'
					onClick={reset}
					type='button'
				>
					Try again
				</button>
			</div>
		</main>
	);
}
