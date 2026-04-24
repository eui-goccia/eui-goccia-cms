export const WORK_PACKAGE_OPTIONS = Array.from({ length: 9 }, (_, index) => {
	const value = `wp${index + 1}`;
	const label = `WP${index + 1}`;

	return { label, value };
});

export const WORK_PACKAGE_LABELS = Object.fromEntries(
	WORK_PACKAGE_OPTIONS.map(({ label, value }) => [value, label])
) as Record<string, string>;

export function getWorkPackageLabel(value?: string | null): string | null {
	if (!value) {
		return null;
	}

	return WORK_PACKAGE_LABELS[value] ?? value.toUpperCase();
}
