/** biome-ignore-all lint/complexity/noExcessiveCognitiveComplexity: faster to write */
import type { FieldHook } from 'payload';

export const formatSlug = (val: string): string =>
	val
		.replace(/ /g, '-')
		.replace(/[^\w-]+/g, '')
		.toLowerCase();

export const formatSlugNoSpecialChars = (val: string): string =>
	val.toLowerCase().replace(/[^a-z]+/g, '');

export const formatSlugHook =
	(fallback: string): FieldHook =>
	({ originalDoc, value }) =>
		(value ? formatSlug(value) : originalDoc.slug) || fallback;

/**
 * Creates a slug hook that always uses the Italian locale version of the specified field
 * This ensures slug consistency regardless of which locale is being edited
 */
export const formatSlugFromItalianHook =
	(fieldToUse: string, collectionSlug: string): FieldHook =>
	async ({ originalDoc, value, req, siblingData }) => {
		// If a slug value is explicitly provided, use it (for manual overrides)
		if (value) {
			return formatSlug(value);
		}

		// If we have existing slug from originalDoc, keep it
		if (originalDoc?.slug) {
			return originalDoc.slug;
		}

		// Try to get the Italian title from sibling data (for new documents)
		let italianFieldValue: string | undefined;

		// For new documents, use the current Italian value from siblingData
		if (siblingData && req?.locale === 'it' && siblingData[fieldToUse]) {
			italianFieldValue = siblingData[fieldToUse] as string;
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

		// Fallback to the field name if no Italian value is found
		return fieldToUse;
	};
