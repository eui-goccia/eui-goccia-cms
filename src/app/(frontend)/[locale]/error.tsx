'use client';

interface ErrorProps {
	error: Error & { digest?: string };
	reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps) {
	return (
		<main className='min-h-screen flex items-center justify-center px-5'>
			<div className='text-center space-y-4'>
				<h1 className='text-2xl font-greed'>Something went wrong</h1>
				<p className='text-gray-600'>
					{error.message || 'An unexpected error occurred'}
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
