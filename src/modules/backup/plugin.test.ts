import { describe, expect, it } from 'vitest';
import { importExportAdminAccess } from './plugin';

describe('import/export access', () => {
	it('allows admins and denies non-admin users', () => {
		expect(
			importExportAdminAccess({
				req: { user: { role: 'admin' } },
			} as never)
		).toBe(true);
		expect(
			importExportAdminAccess({
				req: { user: { role: 'editor' } },
			} as never)
		).toBe(false);
		expect(
			importExportAdminAccess({
				req: { user: null },
			} as never)
		).toBe(false);
	});
});
