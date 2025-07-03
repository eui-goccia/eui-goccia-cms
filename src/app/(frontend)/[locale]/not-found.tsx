'use client';

import { usePlausible } from 'next-plausible';
import { Link } from '@/i18n/routing';
import { Button } from '@/modules/components/ui/button';

export default function NotFound() {
	const plausible = usePlausible();

	plausible('404');
	return (
		<div className='flex flex-col items-center justify-center gap-4'>
			<div className='flex flex-col gap-2 items-center justify-center'>
				<h1 className='text-5xl font-bold'>Oops! 404</h1>
				<p>Pagina non trovata 😢</p>
			</div>
			<Button asChild variant='default'>
				<Link href='/'>Homepage</Link>
			</Button>
		</div>
	);
}
