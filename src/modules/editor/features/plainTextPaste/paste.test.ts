import { describe, expect, it } from 'vitest';
import { normalizeClipboardText, shouldUsePlainTextPaste } from './paste';

describe('PlainTextPasteFeature', () => {
	it('normalizes common ligatures that make pasted letters hard to edit', () => {
		expect(normalizeClipboardText('le ﬁnestre ﬁorite')).toBe(
			'le finestre fiorite'
		);
	});

	it('keeps rich HTML paste when visible HTML text matches plain text', () => {
		expect(
			shouldUsePlainTextPaste({
				htmlText: 'Titoloimportante',
				plainText: 'Titolo importante',
			})
		).toBe(false);
	});

	it('uses plain text when source HTML drops visible characters', () => {
		expect(
			shouldUsePlainTextPaste({
				htmlText: 'Ttolo mportante',
				plainText: 'Titolo importante',
			})
		).toBe(true);
	});

	it('does not intercept internal Lexical or file paste events', () => {
		expect(
			shouldUsePlainTextPaste({
				htmlText: 'Ttolo mportante',
				plainText: 'Titolo importante',
				sourceIsLexical: true,
			})
		).toBe(false);

		expect(
			shouldUsePlainTextPaste({
				hasFiles: true,
				htmlText: 'Ttolo mportante',
				plainText: 'Titolo importante',
			})
		).toBe(false);
	});
});
