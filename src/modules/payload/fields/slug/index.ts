import type {
	CheckboxField,
	PayloadRequest,
	TextField,
	TextFieldSingleValidation,
} from 'payload';

import { formatSlugFromItalianHook, formatSlugHook } from './formatSlug';

interface Overrides {
	slugOverrides?: Partial<SlugTextField>;
	checkboxOverrides?: Partial<CheckboxField>;
}

type SlugTextField = TextField & {
	hasMany?: false;
	validate?: TextFieldSingleValidation;
};

type Slug = (
	fieldToUse?: string,
	overrides?: Overrides,
	collectionSlug?: string
) => [SlugTextField, CheckboxField];

const UNIQUE_SLUG_COLLECTIONS = new Set([
	'posts',
	'resources',
	'authors',
	'tags',
]);

type RelationshipValue = number | string | { id?: number | string } | null;

function getRelationshipID(value: unknown): null | string | undefined {
	if (value === null) {
		return null;
	}

	if (typeof value === 'number' || typeof value === 'string') {
		return String(value);
	}

	if (typeof value === 'object' && value && 'id' in value) {
		const id = (value as { id?: number | string }).id;
		return typeof id === 'number' || typeof id === 'string'
			? String(id)
			: undefined;
	}

	return undefined;
}

async function resolveEventParentID({
	id,
	req,
	siblingData,
}: {
	id?: number | string;
	req: PayloadRequest;
	siblingData: Record<string, unknown>;
}): Promise<null | string> {
	const siblingParentID = getRelationshipID(siblingData.parent);

	if (siblingParentID !== undefined) {
		return siblingParentID;
	}

	if (!id) {
		return null;
	}

	try {
		const currentEvent = await req.payload.findByID({
			collection: 'events',
			id,
			depth: 0,
			select: {
				parent: true,
			},
		});

		return getRelationshipID(currentEvent?.parent) ?? null;
	} catch (error) {
		req.payload.logger.warn(
			`Could not resolve event parent for slug validation: ${error}`
		);
		return null;
	}
}

export const validateEventSiblingSlug: TextFieldSingleValidation = async (
	value,
	{ id, req, siblingData }
) => {
	if (!value) {
		return 'Slug is required.';
	}

	const parentID = await resolveEventParentID({
		id,
		req,
		siblingData: siblingData as Record<string, unknown>,
	});
	const currentID = id ? String(id) : undefined;
	const matches = await req.payload.find({
		collection: 'events',
		where: {
			slug: {
				equals: value,
			},
		},
		depth: 0,
		limit: 100,
		overrideAccess: true,
	});
	const duplicate = matches.docs.some((doc: { id: number | string }) => {
		if (currentID && String(doc.id) === currentID) {
			return false;
		}

		const matchParentID = getRelationshipID(
			(doc as { parent?: RelationshipValue }).parent
		);

		return matchParentID === parentID;
	});

	return duplicate ? 'Sibling events must use unique slugs.' : true;
};

function getSlugConstraints(
	collectionSlug: string | undefined,
	slugOverrides: Partial<SlugTextField> | undefined
): Partial<SlugTextField> {
	if (collectionSlug === 'events') {
		return {
			validate: validateEventSiblingSlug,
		};
	}

	if (collectionSlug && UNIQUE_SLUG_COLLECTIONS.has(collectionSlug)) {
		return {
			unique: true,
			validate: slugOverrides?.validate,
		};
	}

	return {
		validate: slugOverrides?.validate,
	};
}

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
	collectionSlug = undefined
) => {
	const { slugOverrides, checkboxOverrides } = overrides;
	const slugConstraints = getSlugConstraints(collectionSlug, slugOverrides);

	const checkBoxField: CheckboxField = {
		name: 'slugLock',
		type: 'checkbox',
		defaultValue: true,
		admin: {
			hidden: true,
		},
		...checkboxOverrides,
	};

	const slugFieldFromEnglish: SlugTextField = {
		name: 'slug',
		type: 'text',
		index: true,
		label: 'Slug',
		required: true,
		...(slugOverrides || {}),
		...slugConstraints,
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
	const slugConstraints = getSlugConstraints(collectionSlug, slugOverrides);

	const checkBoxField: CheckboxField = {
		name: 'slugLock',
		type: 'checkbox',
		defaultValue: true,
		admin: {
			hidden: true,
		},
		...checkboxOverrides,
	};

	const slugFieldFromIt: SlugTextField = {
		name: 'slug',
		type: 'text',
		index: true,
		label: 'Slug',
		required: true,
		...(slugOverrides || {}),
		...slugConstraints,
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
