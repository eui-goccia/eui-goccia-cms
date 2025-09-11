import { type NextRequest, NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';

const intlMiddleware = createIntlMiddleware(routing);

export default async function middleware(req: NextRequest) {
	const intlResponse = intlMiddleware(req);
	if (intlResponse !== undefined) {
		return intlResponse;
	}

	return NextResponse.next();
}

// Matcher to ensure middleware does not run on API routes or static assets.
export const config = {
	matcher: ['/((?!api|_next|_vercel|admin|next|.*\\..*).*)'],
};
