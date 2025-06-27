import { withPayload } from '@payloadcms/next/withPayload';
import rewrites from './rewrites.js';

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

export default withPayload(nextConfig, { devBundleServerPackages: false });
