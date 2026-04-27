/** biome-ignore-all lint/complexity/noExcessiveCognitiveComplexity: faster to write */
import type { FieldHook } from 'payload';

export const DEFAULT_SLUG_LOCALE = 'it';

export const formatSlug = (val: string): string =>
	val
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '')
		.replace(/-{2,}/g, '-');

export const formatSlugNoSpecialChars = (val: string): string =>
	val
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.replace(/[^a-z]+/g, '');

function isCanonicalSlugLocale(locale: unknown): boolean {
	return locale === DEFAULT_SLUG_LOCALE || locale === undefined;
}

function shouldUseManualSlug(siblingData: Record<string, unknown>): boolean {
	return siblingData.slugLock === false;
}

function getStringFieldValue(
	siblingData: Record<string, unknown>,
	fieldToUse: string
): string | undefined {
	const fieldValue = siblingData[fieldToUse];
	return typeof fieldValue === 'string' && fieldValue.trim()
		? fieldValue
		: undefined;
}

export const formatSlugHook =
	(fallback: string): FieldHook =>
	({ originalDoc, req, siblingData, value }) => {
		const existingSlug = originalDoc?.slug;

		if (!isCanonicalSlugLocale(req.locale)) {
			return existingSlug || value || fallback;
		}

		if (shouldUseManualSlug(siblingData) && value) {
			return formatSlug(value);
		}

		const sourceValue = getStringFieldValue(siblingData, fallback);

		if (sourceValue) {
			return formatSlug(sourceValue);
		}

		return (value ? formatSlug(value) : existingSlug) || fallback;
	};

/**
 * Creates a slug hook that always uses the Italian locale version of the specified field
 * This ensures slug consistency regardless of which locale is being edited
 */
export const formatSlugFromItalianHook =
	(fieldToUse: string, collectionSlug: string): FieldHook =>
	async ({ originalDoc, value, req, siblingData }) => {
		const existingSlug = originalDoc?.slug;

		if (!isCanonicalSlugLocale(req.locale)) {
			return existingSlug || value || '';
		}

		if (shouldUseManualSlug(siblingData) && value) {
			return formatSlug(value);
		}

		// Try to get the Italian title from sibling data (for new documents)
		let italianFieldValue: string | undefined;

		// For new documents, use the current Italian value from siblingData
		if (siblingData && req?.locale === DEFAULT_SLUG_LOCALE) {
			italianFieldValue = getStringFieldValue(siblingData, fieldToUse);
		}

		// If we couldn't get it from siblingData and we have a document ID, fetch it from the database
		if (!italianFieldValue && originalDoc?.id && req?.payload) {
			try {
				// Use type assertion for the collection slug to avoid TypeScript issues
				const docWithItalianData = await req.payload.findByID({
					collection: collectionSlug as 'posts',
					id: originalDoc.id,
					locale: 'it',
					depth: 0,
				});

				// Safely extract the Italian field value
				if (docWithItalianData && fieldToUse in docWithItalianData) {
					const fieldValue =
						docWithItalianData[fieldToUse as keyof typeof docWithItalianData];
					if (typeof fieldValue === 'string') {
						italianFieldValue = fieldValue;
					}
				}
			} catch (error) {
				req?.payload?.logger?.warn(
					`Could not fetch Italian locale data for slug generation: ${error}`
				);
			}
		}

		// Generate slug from the Italian field value if available
		if (italianFieldValue) {
			return formatSlug(italianFieldValue);
		}

		return (value ? formatSlug(value) : existingSlug) || '';
	};
