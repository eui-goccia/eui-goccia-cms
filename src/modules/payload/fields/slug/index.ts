import type { CheckboxField, TextField } from 'payload';

import { formatSlugFromItalianHook, formatSlugHook } from './formatSlug';

interface Overrides {
	slugOverrides?: Partial<TextField>;
	checkboxOverrides?: Partial<CheckboxField>;
}

type Slug = (
	fieldToUse?: string,
	overrides?: Overrides,
	collectionSlug?: string
) => [TextField, CheckboxField];

/**
 * Creates a slug field derived from the current locale version of a source field.
 *
 * @param fieldToUse - The source field name to generate the slug from (default: `'title'`).
 * @param overrides - Optional partial overrides for the slug `TextField` and lock `CheckboxField`.
 * @param _collectionSlug - Accepted for signature compatibility with {@link slugFieldFromItalian}
 *   but intentionally unused — `slugField` generates slugs via {@link formatSlugHook}, which
 *   operates on the current document and does not need the collection slug.
 *
 * Use {@link slugFieldFromItalian} instead when slugs must always derive from the Italian locale;
 * it passes `collectionSlug` to {@link formatSlugFromItalianHook} to fetch the Italian value.
 */
export const slugField: Slug = (
	fieldToUse = 'title',
	overrides = {},
	_collectionSlug
) => {
	const { slugOverrides, checkboxOverrides } = overrides;

	const checkBoxField: CheckboxField = {
		name: 'slugLock',
		type: 'checkbox',
		defaultValue: true,
		admin: {
			hidden: true,
		},
		...checkboxOverrides,
	};

	// Expect ts error here because of typescript mismatching Partial<TextField> with TextField
	// @ts-expect-error
	const slugFieldFromEnglish: TextField = {
		name: 'slug',
		type: 'text',
		index: true,
		label: 'Slug',
		...(slugOverrides || {}),
		hooks: {
			// Kept this in for hook or API based updates
			beforeValidate: [formatSlugHook(fieldToUse)],
		},
		admin: {
			...(slugOverrides?.admin || {}),
			position: 'sidebar',
			components: {
				Field: {
					path: '@/modules/payload/fields/slug/SlugComponent#SlugComponent',
					clientProps: {
						fieldToUse,
						checkboxFieldPath: checkBoxField.name,
					},
				},
			},
		},
	};

	return [slugFieldFromEnglish, checkBoxField];
};

/**
 * Creates a slug field that always generates slugs from the Italian locale version
 * of the specified field, ensuring consistency regardless of editing locale
 */
export const slugFieldFromItalian: Slug = (
	fieldToUse = 'title',
	overrides = {},
	collectionSlug = 'posts'
) => {
	const { slugOverrides, checkboxOverrides } = overrides;

	const checkBoxField: CheckboxField = {
		name: 'slugLock',
		type: 'checkbox',
		defaultValue: true,
		admin: {
			hidden: true,
		},
		...checkboxOverrides,
	};

	// @ts-expect-error
	const slugFieldFromIt: TextField = {
		name: 'slug',
		type: 'text',
		index: true,
		label: 'Slug',
		...(slugOverrides || {}),
		hooks: {
			// Use the Italian-specific hook for consistent slug generation
			beforeValidate: [formatSlugFromItalianHook(fieldToUse, collectionSlug)],
		},
		admin: {
			...(slugOverrides?.admin || {}),
			position: 'sidebar',
			components: {
				Field: {
					path: '@/modules/payload/fields/slug/SlugComponent#SlugComponent',
					clientProps: {
						fieldToUse,
						checkboxFieldPath: checkBoxField.name,
					},
				},
			},
		},
	};

	return [slugFieldFromIt, checkBoxField];
};
