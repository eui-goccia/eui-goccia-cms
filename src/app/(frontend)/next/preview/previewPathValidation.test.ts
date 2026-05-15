import { describe, expect, it } from 'vitest';
import { isValidPreviewPath } from './validatePreviewPath';

describe('preview path validation', () => {
	it('allows matching post preview paths', () => {
		expect(
			isValidPreviewPath({
				collection: 'posts',
				path: '/blog/a',
				slug: 'a',
			})
		).toBe(true);
	});

	it('allows matching resource preview paths', () => {
		expect(
			isValidPreviewPath({
				collection: 'resources',
				path: '/risorse/a',
				slug: 'a',
			})
		).toBe(true);
	});

	it('allows nested event paths with the slug as a full segment', () => {
		expect(
			isValidPreviewPath({
				collection: 'events',
				path: '/eventi/parent/child',
				slug: 'child',
			})
		).toBe(true);
	});

	it('rejects event paths where the slug is only part of a segment', () => {
		expect(
			isValidPreviewPath({
				collection: 'events',
				path: '/eventi/parent/childish',
				slug: 'child',
			})
		).toBe(false);
	});

	it('rejects collection and path mismatches', () => {
		expect(
			isValidPreviewPath({
				collection: 'posts',
				path: '/risorse/a',
				slug: 'a',
			})
		).toBe(false);
	});

	it('rejects external URL-like paths', () => {
		expect(
			isValidPreviewPath({
				collection: 'posts',
				path: 'https://example.com/blog/a',
				slug: 'a',
			})
		).toBe(false);
		expect(
			isValidPreviewPath({
				collection: 'posts',
				path: '/https:%2F%2Fexample.com/blog/a',
				slug: 'a',
			})
		).toBe(false);
		expect(
			isValidPreviewPath({
				collection: 'posts',
				path: '/blog/http:%2F%2Fexample.com',
				slug: 'http://example.com',
			})
		).toBe(false);
	});

	it('rejects traversal paths', () => {
		expect(
			isValidPreviewPath({
				collection: 'posts',
				path: '/blog/../admin',
				slug: 'admin',
			})
		).toBe(false);
	});
});
