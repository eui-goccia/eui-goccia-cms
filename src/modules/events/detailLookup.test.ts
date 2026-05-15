import { describe, expect, it } from 'vitest';
import {
	getEventDetailQueryOptions,
	getEventDetailSegmentWhere,
} from './detailLookup';

describe('event detail lookup', () => {
	it('uses draft access for draft lookups only', () => {
		expect(
			getEventDetailQueryOptions({ draft: true, locale: 'it' })
		).toMatchObject({
			draft: true,
			overrideAccess: true,
		});
		expect(
			getEventDetailQueryOptions({ draft: false, locale: 'it' })
		).toMatchObject({
			draft: false,
			overrideAccess: false,
		});
	});

	it('limits each segment lookup to one sibling match', () => {
		expect(
			getEventDetailQueryOptions({ draft: false, locale: 'it' })
		).toMatchObject({
			limit: 1,
		});
	});

	it('builds parent-scoped segment lookups', () => {
		expect(
			getEventDetailSegmentWhere({ parentID: null, slug: 'parent' })
		).toEqual({
			and: [{ slug: { equals: 'parent' } }, { parent: { exists: false } }],
		});

		expect(
			getEventDetailSegmentWhere({ parentID: 'parent-id', slug: 'child' })
		).toEqual({
			and: [{ slug: { equals: 'child' } }, { parent: { equals: 'parent-id' } }],
		});
	});
});
