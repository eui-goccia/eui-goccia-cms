const localization = {
	defaultLocale: 'it' as const,
	fallback: true,
	locales: [
		{
			code: 'en',
			// Regarding the label, we are using the syntax "{lang. in English} - ({lang. in native})".
			// The consensus is that it's a good idea to have languages ​​listed in their own languages: https://ux.stackexchange.com/q/37017/144485
			// Although others have made good points about why it is good to have them in English:
			// such as the user type, and the order of languages. See https://ux.stackexchange.com/q/3592/144485
			label: 'English 🇺🇸',
		},
		{
			code: 'it',
			label: 'Italiano 🇮🇹',
		},
	],
};

export default localization;
