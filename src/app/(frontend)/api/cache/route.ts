import { headers } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';
import type { Locales } from '@/i18n/routing';
import {
	type CacheScope,
	invalidateAllContent,
	invalidateContent,
	invalidateForLivePreview,
} from '@/modules/utilities/cache';

/**
 * Cache management API route
 * Useful for manual cache invalidation and live preview
 */

export async function POST(request: NextRequest) {
	try {
		const requestHeaders = await headers();
		const authHeader = requestHeaders.get('authorization');

		// Simple auth check - in production you might want something more robust
		const isAuthorized =
			authHeader === `Bearer ${process.env.CRON_SECRET}` ||
			authHeader === `Bearer ${process.env.PAYLOAD_SECRET}` ||
			process.env.NODE_ENV === 'development';

		if (!isAuthorized) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const body = await request.json();
		const {
			action,
			scope,
			identifier,
			locale,
			livePreview = false,
		}: {
			action: 'invalidate' | 'invalidate-all';
			scope?: CacheScope;
			identifier?: string;
			locale?: Locales;
			livePreview?: boolean;
		} = body;

		if (action === 'invalidate-all') {
			invalidateAllContent();
			return NextResponse.json({
				success: true,
				message: 'All cache invalidated',
				timestamp: new Date().toISOString(),
			});
		}

		if (action === 'invalidate' && scope) {
			if (livePreview) {
				invalidateForLivePreview(scope, identifier, locale);
				return NextResponse.json({
					success: true,
					message: `Live preview cache invalidated for ${scope}${identifier ? `:${identifier}` : ''}`,
					timestamp: new Date().toISOString(),
				});
			} else {
				invalidateContent(scope, identifier, locale);
				return NextResponse.json({
					success: true,
					message: `Cache invalidated for ${scope}${identifier ? `:${identifier}` : ''}`,
					timestamp: new Date().toISOString(),
				});
			}
		}

		return NextResponse.json(
			{ error: 'Invalid action or missing scope' },
			{ status: 400 }
		);
	} catch (error) {
		console.error('Cache invalidation error:', error);
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
}

export async function GET() {
	// Simple health check for the cache API
	return NextResponse.json({
		status: 'Cache API is running',
		timestamp: new Date().toISOString(),
		endpoints: {
			POST: {
				description: 'Invalidate cache',
				examples: [
					{
						action: 'invalidate',
						scope: 'posts',
						identifier: 'my-post-slug',
						locale: 'it',
						livePreview: true,
					},
					{
						action: 'invalidate',
						scope: 'global',
						identifier: 'home',
					},
					{
						action: 'invalidate-all',
					},
				],
			},
		},
	});
}
