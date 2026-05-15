import { describe, expect, it } from 'vitest';
import { isHttpUrl } from './utils';

describe('event utilities', () => {
	it('accepts absolute http and https URLs', () => {
		expect(isHttpUrl('https://example.com')).toBe(true);
		expect(isHttpUrl('http://example.com')).toBe(true);
	});

	it('rejects placeholder, blank, and relative booking URLs', () => {
		expect(isHttpUrl('---')).toBe(false);
		expect(isHttpUrl('')).toBe(false);
		expect(isHttpUrl('   ')).toBe(false);
		expect(isHttpUrl('/tickets')).toBe(false);
		expect(isHttpUrl('tickets')).toBe(false);
	});
});
