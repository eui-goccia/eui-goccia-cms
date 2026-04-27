import { describe, expect, it } from 'vitest';
import {
	formatSlug,
	formatSlugFromItalianHook,
	formatSlugHook,
} from './formatSlug';

describe('slug formatting', () => {
	it('normalizes Italian accents into stable ASCII slugs', () => {
		expect(formatSlug("Perché città è già l'acqua")).toBe(
			'perche-citta-e-gia-l-acqua'
		);
	});

	it('preserves canonical slugs when editing a non-Italian locale', async () => {
		const hook = formatSlugFromItalianHook('title', 'posts');

		await expect(
			hook({
				originalDoc: { slug: 'titolo-canonico' },
				req: { locale: 'en' },
				siblingData: { slugLock: true, title: 'English title' },
				value: 'english-title',
			} as never)
		).resolves.toBe('titolo-canonico');
	});

	it('generates from the Italian source while locked', async () => {
		const hook = formatSlugFromItalianHook('title', 'posts');

		await expect(
			hook({
				originalDoc: { slug: 'vecchio-titolo' },
				req: { locale: 'it' },
				siblingData: { slugLock: true, title: 'Nuovo titolo' },
				value: 'vecchio-titolo',
			} as never)
		).resolves.toBe('nuovo-titolo');
	});

	it('allows manual canonical overrides when unlocked', async () => {
		const hook = formatSlugHook('name');

		expect(
			await hook({
				originalDoc: { slug: 'vecchio' },
				req: { locale: 'it' },
				siblingData: { name: 'Nome automatico', slugLock: false },
				value: 'Override manuale',
			} as never)
		).toBe('override-manuale');
	});
});
