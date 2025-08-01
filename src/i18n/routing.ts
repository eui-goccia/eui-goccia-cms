import type { Config } from '@payload-types';
import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';
import localization from './localization';

export const routing = defineRouting({
	locales: localization.locales.map((locale) => locale.code),
	defaultLocale: localization.defaultLocale,
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter } =
	createNavigation(routing);

export type Locale = (typeof routing.locales)[number];
export type Locales = Config['locale'] | 'all' | undefined;
