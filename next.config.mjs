import { withPayload } from '@payloadcms/next/withPayload';
import createNextIntlPlugin from 'next-intl/plugin';

import rewrites from './rewrites.js';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactCompiler: true,
	typedRoutes: true,
	cacheComponents: true,
	rewrites,
	serverExternalPackages: ['sharp'],
};

export default withNextIntl(
	withPayload(nextConfig, { devBundleServerPackages: false })
);
