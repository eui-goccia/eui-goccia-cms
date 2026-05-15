import { describe, expect, it } from 'vitest';
import { getEventRelativePath } from './paths';

describe('event path generation', () => {
	it('generates one segment for root events', () => {
		expect(getEventRelativePath({ slug: 'root-event' })).toBe('/root-event');
	});

	it('generates two segments for child events', () => {
		expect(
			getEventRelativePath({
				slug: 'child-event',
				parent: {
					slug: 'root-event',
					parent: null,
				},
			})
		).toBe('/root-event/child-event');
	});

	it('generates three segments for grandchild events', () => {
		expect(
			getEventRelativePath({
				slug: 'grandchild-event',
				parent: {
					slug: 'child-event',
					parent: {
						slug: 'root-event',
						parent: null,
					},
				},
			})
		).toBe('/root-event/child-event/grandchild-event');
	});
});
