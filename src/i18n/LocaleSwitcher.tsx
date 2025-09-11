'use client';

import { useParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import type { TypedLocale } from 'payload';
import { useTransition } from 'react';
import localization from '@/i18n/localization';
import { usePathname, useRouter } from '@/i18n/routing';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/modules/components/ui/select';

export function LocaleSwitcher() {
	// inspired by https://github.com/amannn/next-intl/blob/main/examples/example-app-router/src/components/LocaleSwitcherSelect.tsx
	const locale = useLocale();
	const router = useRouter();
	const [, startTransition] = useTransition();
	const pathname = usePathname();
	const params = useParams();

	function onSelectChange(value: TypedLocale) {
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
		<Select onValueChange={onSelectChange} value={locale}>
			<SelectTrigger className='w-full max-w-32 text-greed text-base bg-transparent gap-2'>
				<SelectValue placeholder='Theme' />
			</SelectTrigger>
			<SelectContent>
				{localization.locales
					.sort((a, b) => a.label.localeCompare(b.label)) // Ordenar por label
					.map((lang, i) => (
						<SelectItem key={`${lang.code}-${i}`} value={lang.code}>
							{lang.label}
						</SelectItem>
					))}
			</SelectContent>
		</Select>
	);
}
