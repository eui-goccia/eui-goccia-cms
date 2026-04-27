import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	resolve: {
		alias: {
			'@': path.resolve(dirname, 'src'),
			'@payload-config': path.resolve(
				dirname,
				'src/modules/payload/payload.config.ts'
			),
			'@payload-types': path.resolve(
				dirname,
				'src/modules/payload/payload-types.ts'
			),
		},
	},
	test: {
		environment: 'node',
		include: ['src/**/*.test.ts'],
	},
});
