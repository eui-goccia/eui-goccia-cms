'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { Link } from '@/i18n/routing';
import { Button } from '@/modules/components/ui/button';

export default function NotFound() {
	const locale = useLocale();
	const t = useTranslations('404');

	useEffect(() => {
		const w = window as unknown as { plausible?: (event: string) => void };
		w.plausible?.('404');
	}, []);
	return (
		<div className='flex flex-col items-center justify-center gap-4'>
			<div className='flex flex-col gap-2 items-center justify-center'>
				<h1 className='text-5xl font-bold'>Oops! 404</h1>
				<p>{t('description')}</p>
			</div>
			<Button asChild variant='default'>
				<Link href='/' locale={locale}>
					Homepage
				</Link>
			</Button>
		</div>
	);
}
