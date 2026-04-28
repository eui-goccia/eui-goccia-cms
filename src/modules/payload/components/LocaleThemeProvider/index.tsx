'use client';
import { useLocale, useTheme } from '@payloadcms/ui';
import { type FC, type ReactNode, useLayoutEffect } from 'react';
import './index.scss';

const LocaleThemeProvider: FC<{ children?: ReactNode }> = ({ children }) => {
	const locale = useLocale();
	const { autoMode, theme } = useTheme();

	useLayoutEffect(() => {
		document.documentElement.classList.remove(
			'admin-locale-en',
			'admin-locale-it'
		);

		if (locale.code === 'en') {
			document.documentElement.classList.add('admin-locale-en');
		}

		document.documentElement.setAttribute('data-admin-locale', locale.code);
		document.documentElement.setAttribute('data-admin-theme', theme);
		document.documentElement.setAttribute(
			'data-admin-theme-mode',
			autoMode ? 'auto' : 'manual'
		);

		if (document.documentElement.getAttribute('data-theme') !== theme) {
			document.documentElement.setAttribute('data-theme', theme);
		}
	}, [autoMode, locale.code, theme]);

	return <>{children}</>;
};

export default LocaleThemeProvider;
