import { withPayload } from '@payloadcms/next/withPayload';
import createNextIntlPlugin from 'next-intl/plugin';

import rewrites from './rewrites.js';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactCompiler: true,
	typedRoutes: true,
	cacheComponents: true,
	images: {
		deviceSizes: [640, 1080, 1920],
		imageSizes: [32, 64, 256],
		formats: ['image/avif', 'image/webp'],
		remotePatterns: [
			{
				protocol: 'http',
				hostname:
					process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL ??
					process.env.NEXT_PUBLIC_VERCEL_URL ??
					process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL,
			},
			{
				protocol: 'https',
				hostname:
					process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL ??
					process.env.NEXT_PUBLIC_VERCEL_URL ??
					process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL,
			},
		],
	},
	rewrites,
	serverExternalPackages: ['sharp'],
};

export default withNextIntl(
	withPayload(nextConfig, { devBundleServerPackages: false })
);
