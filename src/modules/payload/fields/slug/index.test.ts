import { describe, expect, it, vi } from 'vitest';
import { slugField, slugFieldFromItalian, validateEventSiblingSlug } from '.';

describe('slug field config', () => {
	it('requires slugs and sets global uniqueness for non-event content slugs', () => {
		const fields = [
			slugFieldFromItalian('title', {}, 'posts')[0],
			slugFieldFromItalian('title', {}, 'resources')[0],
			slugField('name', {}, 'authors')[0],
			slugField('name', {}, 'tags')[0],
		];

		for (const field of fields) {
			expect(field.name).toBe('slug');
			expect(field.required).toBe(true);
			expect(field.unique).toBe(true);
		}
	});

	it('uses sibling uniqueness validation for event slugs', () => {
		const [field] = slugFieldFromItalian('title', {}, 'events');

		expect(field.required).toBe(true);
		expect(field.unique).toBeUndefined();
		expect(field.validate).toBe(validateEventSiblingSlug);
	});
});

describe('event sibling slug validation', () => {
	it('rejects duplicate event slugs only under the same parent', async () => {
		const find = vi.fn().mockResolvedValue({
			docs: [
				{ id: 'a', parent: 'parent-a', slug: 'child' },
				{ id: 'b', parent: 'parent-b', slug: 'child' },
			],
		});
		const req = {
			payload: {
				find,
				logger: { warn: vi.fn() },
			},
		};

		await expect(
			validateEventSiblingSlug('child', {
				id: 'current',
				req,
				siblingData: { parent: 'parent-a' },
			} as never)
		).resolves.toBe('Sibling events must use unique slugs.');

		await expect(
			validateEventSiblingSlug('child', {
				id: 'current',
				req,
				siblingData: { parent: 'parent-c' },
			} as never)
		).resolves.toBe(true);

		expect(find).toHaveBeenCalledWith(
			expect.objectContaining({
				pagination: false,
			})
		);
	});
});
