import { describe, expect, it } from 'vitest';
import {
	getEventDetailExactWhere,
	getEventDetailQueryOptions,
	getEventDetailRelativePath,
} from './detailLookup';

describe('event detail lookup', () => {
	it('builds the final breadcrumb path from all route segments', () => {
		const relativePath = getEventDetailRelativePath([
			'parent',
			'child',
			'grandchild',
		]);

		expect(relativePath).toBe('/parent/child/grandchild');
		expect(getEventDetailExactWhere(relativePath)).toEqual({
			'breadcrumbs.url': { equals: '/parent/child/grandchild' },
		});
	});

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
});
