import configPromise from '@payload-config';
import { draftMode } from 'next/headers';
import type { NextRequest } from 'next/server';
import { getLocale } from 'next-intl/server';
import type { AuthResult } from 'node_modules/payload/dist/auth/operations/auth';
import type { CollectionSlug, PayloadRequest } from 'payload';
import { getPayload } from 'payload';
import { redirect } from '@/i18n/routing';

export async function GET(request: NextRequest) {
	const payload = await getPayload({ config: configPromise });

	const { searchParams } = new URL(request.url);

	const path = searchParams.get('path');
	const collection = searchParams.get('collection') as CollectionSlug;
	const slug = searchParams.get('slug');
	const previewSecret = searchParams.get('previewSecret');

	if (previewSecret !== process.env.PREVIEW_SECRET) {
		return new Response('You are not allowed to preview this page', {
			status: 403,
		});
	}

	if (!(path && collection && slug)) {
		return new Response('Insufficient search params', { status: 404 });
	}

	if (!path.startsWith('/')) {
		return new Response(
			'This endpoint can only be used for relative previews',
			{ status: 500 }
		);
	}

	let result: AuthResult | null = null;

	try {
		result = await payload.auth({
			req: request as unknown as PayloadRequest,
			headers: request.headers,
		});
	} catch (error) {
		payload.logger.error(
			{ err: error },
			'Error verifying token for live preview'
		);
		return new Response('You are not allowed to preview this page', {
			status: 403,
		});
	}

	const draft = await draftMode();

	if (!result.user) {
		draft.disable();
		return new Response('You must be authenticated to preview', {
			status: 401,
		});
	}

	draft.enable();
	const locale = await getLocale();

	redirect({ href: path, locale });
}
