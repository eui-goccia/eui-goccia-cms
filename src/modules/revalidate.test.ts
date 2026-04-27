import { revalidatePath, revalidateTag } from 'next/cache';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { revalidateEvent } from './events/revalidate';
import { revalidatePost } from './posts/revalidate';
import { revalidateResource } from './resources/revalidate';

vi.mock('next/cache', () => ({
	revalidatePath: vi.fn(),
	revalidateTag: vi.fn(),
}));

const revalidatePathMock = vi.mocked(revalidatePath);
const revalidateTagMock = vi.mocked(revalidateTag);

function createReq(overrides = {}) {
	return {
		context: {},
		payload: {
			find: vi.fn().mockResolvedValue({ docs: [] }),
			logger: {
				info: vi.fn(),
			},
			...overrides,
		},
	};
}

describe('collection revalidation hooks', () => {
	beforeEach(() => {
		revalidatePathMock.mockClear();
		revalidateTagMock.mockClear();
	});

	it('revalidates a previously published post when it becomes draft', async () => {
		await revalidatePost({
			doc: { slug: 'alpha', _status: 'draft' },
			previousDoc: { slug: 'alpha', _status: 'published' },
			req: createReq(),
		} as never);

		expect(revalidatePathMock).toHaveBeenCalledWith('/blog/alpha');
		expect(revalidateTagMock).toHaveBeenCalledWith('posts:doc:alpha', {});
	});

	it('revalidates both old and new post paths when a published slug changes', async () => {
		await revalidatePost({
			doc: { slug: 'new-slug', _status: 'published' },
			previousDoc: { slug: 'old-slug', _status: 'published' },
			req: createReq(),
		} as never);

		expect(revalidatePathMock).toHaveBeenCalledWith('/blog/new-slug');
		expect(revalidatePathMock).toHaveBeenCalledWith('/blog/old-slug');
		expect(revalidateTagMock).toHaveBeenCalledWith('posts:doc:new-slug', {});
		expect(revalidateTagMock).toHaveBeenCalledWith('posts:doc:old-slug', {});
	});

	it('revalidates both old and new resource paths when a published slug changes', async () => {
		await revalidateResource({
			doc: { slug: 'new-resource', _status: 'published' },
			previousDoc: { slug: 'old-resource', _status: 'published' },
			req: createReq(),
		} as never);

		expect(revalidatePathMock).toHaveBeenCalledWith('/risorse/new-resource');
		expect(revalidatePathMock).toHaveBeenCalledWith('/risorse/old-resource');
		expect(revalidateTagMock).toHaveBeenCalledWith(
			'resources:doc:new-resource',
			{}
		);
		expect(revalidateTagMock).toHaveBeenCalledWith(
			'resources:doc:old-resource',
			{}
		);
	});

	it('revalidates nested event paths when breadcrumbs are available', async () => {
		const find = vi.fn().mockResolvedValue({
			docs: [
				{
					id: 'child',
					slug: 'child',
					breadcrumbs: [{ url: '/new-event/child' }],
				},
			],
		});

		await revalidateEvent({
			doc: {
				id: 'parent',
				slug: 'new-event',
				_status: 'published',
				breadcrumbs: [{ url: '/new-event' }],
			},
			previousDoc: {
				id: 'parent',
				slug: 'old-event',
				_status: 'published',
				breadcrumbs: [{ url: '/old-event' }],
			},
			req: createReq({ find }),
		} as never);

		expect(revalidatePathMock).toHaveBeenCalledWith('/eventi/new-event');
		expect(revalidatePathMock).toHaveBeenCalledWith('/eventi/old-event');
		expect(revalidatePathMock).toHaveBeenCalledWith('/eventi/new-event/child');
		expect(find).toHaveBeenCalledWith(
			expect.objectContaining({
				collection: 'events',
				where: { parent: { equals: 'parent' } },
			})
		);
	});
});
