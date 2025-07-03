import { withPayload } from '@payloadcms/next/withPayload';
import createNextIntlPlugin from 'next-intl/plugin';

import rewrites from './rewrites.js';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
	// Your Next.js config here
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
	rewrites,
};

export default withNextIntl(
	withPayload(nextConfig, { devBundleServerPackages: false })
);
