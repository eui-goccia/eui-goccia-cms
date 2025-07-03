import { getRequestConfig } from 'next-intl/server';
import type { TypedLocale } from 'payload';
import type it from './messages/it.json';
import { routing } from './routing';

type Messages = typeof it;

declare global {
	// Use type safe message keys with `next-intl`
	interface IntlMessages extends Messages {}
}

export default getRequestConfig(async ({ requestLocale }) => {
	// This typically corresponds to the `[locale]` segment
	let locale = await requestLocale;

	// Ensure that a valid locale is used
	if (!locale || !routing.locales.includes(locale as TypedLocale)) {
		locale = routing.defaultLocale;
	}

	return {
		locale,
		messages: (await import(`./messages/${locale}.json`)).default,
	};
});
