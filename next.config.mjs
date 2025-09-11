import { withPayload } from '@payloadcms/next/withPayload';
import createNextIntlPlugin from 'next-intl/plugin';

import rewrites from './rewrites.js';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
	eslint: {
		ignoreDuringBuilds: true,
	},
	webpack: (webpackConfig) => {
		webpackConfig.resolve.extensionAlias = {
			'.cjs': ['.cts', '.cjs'],
			'.js': ['.ts', '.tsx', '.js', '.jsx'],
			'.mjs': ['.mts', '.mjs'],
		};

		return webpackConfig;
	},
	turbopack: {
		resolveExtensions: ['.ts', '.tsx', '.js', '.jsx', '.cjs', '.mjs'],
	},
	images: {
		qualities: [25, 30, 60, 75, 80, 90, 100],
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
};

export default withNextIntl(
	withPayload(nextConfig, { devBundleServerPackages: false })
);
