'use client';

import { createClientFeature } from '@payloadcms/richtext-lexical/client';
import {
	$createTabNode,
	$getSelection,
	$isRangeSelection,
	COMMAND_PRIORITY_HIGH,
	PASTE_COMMAND,
	PASTE_TAG,
} from '@payloadcms/richtext-lexical/lexical';
import { useLexicalComposerContext } from '@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext';
import { useEffect } from 'react';
import { normalizeClipboardText, shouldUsePlainTextPaste } from './paste';

const IGNORED_HTML_TAGS = new Set(['NOSCRIPT', 'SCRIPT', 'STYLE', 'TEMPLATE']);
const PLAIN_TEXT_PARTS_PATTERN = /(\r?\n|\t)/;

function getVisibleTextFromHTML(html: string): string {
	if (!html || typeof DOMParser === 'undefined') {
		return '';
	}

	const document = new DOMParser().parseFromString(html, 'text/html');

	for (const element of document.body.querySelectorAll(
		Array.from(IGNORED_HTML_TAGS).join(',')
	)) {
		element.remove();
	}

	return document.body.textContent ?? '';
}

function insertPlainText(text: string): boolean {
	const selection = $getSelection();

	if (!$isRangeSelection(selection)) {
		return false;
	}

	const parts = normalizeClipboardText(text).split(PLAIN_TEXT_PARTS_PATTERN);

	if (parts.at(-1) === '') {
		parts.pop();
	}

	for (const part of parts) {
		const currentSelection = $getSelection();

		if (!$isRangeSelection(currentSelection)) {
			continue;
		}

		if (part === '\n' || part === '\r\n') {
			currentSelection.insertParagraph();
		} else if (part === '\t') {
			currentSelection.insertNodes([$createTabNode()]);
		} else {
			currentSelection.insertText(part);
		}
	}

	return true;
}

function PlainTextPastePlugin() {
	const [editor] = useLexicalComposerContext();

	useEffect(
		() =>
			editor.registerCommand<ClipboardEvent>(
				PASTE_COMMAND,
				(event) => {
					const clipboardData = event.clipboardData;

					if (!clipboardData) {
						return false;
					}

					const plainText = clipboardData.getData('text/plain');
					const html = clipboardData.getData('text/html');

					if (
						!shouldUsePlainTextPaste({
							hasFiles:
								clipboardData.files.length > 0 ||
								Array.from(clipboardData.types).includes('Files'),
							htmlText: getVisibleTextFromHTML(html),
							plainText,
							sourceIsLexical: Boolean(
								clipboardData.getData('application/x-lexical-editor')
							),
						})
					) {
						return false;
					}

					let didInsert = false;
					editor.update(
						() => {
							didInsert = insertPlainText(plainText);
						},
						{ tag: PASTE_TAG }
					);

					if (!didInsert) {
						return false;
					}

					event.preventDefault();

					return true;
				},
				COMMAND_PRIORITY_HIGH
			),
		[editor]
	);

	return null;
}

export const PlainTextPasteFeatureClient = createClientFeature({
	plugins: [
		{
			Component: PlainTextPastePlugin,
			position: 'normal',
		},
	],
});
