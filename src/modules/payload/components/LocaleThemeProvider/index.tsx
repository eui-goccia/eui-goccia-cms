'use client';
import { useLocale, useTheme } from '@payloadcms/ui';
import { useEffect } from 'react';
import './index.scss';

const LocaleThemeProvider: React.FC<{ children?: React.ReactNode }> = ({
	children,
}) => {
	const locale = useLocale();
	const { theme } = useTheme();

	useEffect(() => {
		// Remove any existing locale classes
		document.documentElement.classList.remove(
			'admin-locale-en',
			'admin-locale-it'
		);

		// Only add class for English locale (Italian stays default/unchanged)
		if (locale.code === 'en') {
			document.documentElement.classList.add('admin-locale-en');
		}

		// Add data attribute for easy CSS targeting
		document.documentElement.setAttribute('data-admin-locale', locale.code);
	}, [locale.code]);

	return <>{children}</>;
};

export default LocaleThemeProvider;
