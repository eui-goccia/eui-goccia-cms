const LIGATURES: Record<string, string> = {
	'\ufb00': 'ff',
	'\ufb01': 'fi',
	'\ufb02': 'fl',
	'\ufb03': 'ffi',
	'\ufb04': 'ffl',
	'\ufb05': 'st',
	'\ufb06': 'st',
};

const LIGATURE_PATTERN = /[\ufb00-\ufb06]/g;
const WHITESPACE_PATTERN = /\s+/g;

export function normalizeClipboardText(text: string): string {
	return text.replace(
		LIGATURE_PATTERN,
		(character) => LIGATURES[character] ?? character
	);
}

export function normalizeClipboardTextForComparison(text: string): string {
	return normalizeClipboardText(text).replace(WHITESPACE_PATTERN, '');
}

interface ShouldUsePlainTextPasteArgs {
	hasFiles?: boolean;
	htmlText?: string;
	plainText: string;
	sourceIsLexical?: boolean;
}

export function shouldUsePlainTextPaste({
	hasFiles = false,
	htmlText,
	plainText,
	sourceIsLexical = false,
}: ShouldUsePlainTextPasteArgs): boolean {
	if (hasFiles || sourceIsLexical || !plainText) {
		return false;
	}

	if (normalizeClipboardText(plainText) !== plainText) {
		return true;
	}

	if (!htmlText) {
		return false;
	}

	return (
		normalizeClipboardTextForComparison(htmlText) !==
		normalizeClipboardTextForComparison(plainText)
	);
}
