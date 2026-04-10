'use client';

import { useParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import type { TypedLocale } from 'payload';
import { useTransition } from 'react';
import { usePathname, useRouter } from '@/i18n/routing';
import { cn } from '@/modules/utilities/cnUtils';

export function LocaleSwitcher() {
	const locale = useLocale();
	const router = useRouter();
	const [, startTransition] = useTransition();
	const pathname = usePathname();
	const params = useParams();

	function switchLocale(value: TypedLocale) {
		startTransition(() => {
			router.replace(
				// @ts-expect-error -- TypeScript will validate that only known `params`
				// are used in combination with a given `pathname`. Since the two will
				// always match for the current route, we can skip runtime checks.
				{ pathname, params },
				{ locale: value }
			);
		});
	}

	return (
		<div className='flex items-center text-xl gap-1'>
			<button
				className={cn(
					'cursor-pointer',
					locale === 'it' && 'underline decoration-1 underline-offset-4'
				)}
				onClick={() => switchLocale('it')}
				type='button'
			>
				IT
			</button>
			<span>/</span>
			<button
				className={cn(
					'cursor-pointer',
					locale === 'en' && 'underline decoration-1 underline-offset-4'
				)}
				onClick={() => switchLocale('en')}
				type='button'
			>
				EN
			</button>
		</div>
	);
}
