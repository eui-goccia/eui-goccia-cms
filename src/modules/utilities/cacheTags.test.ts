import { describe, expect, it } from 'vitest';
import {
	collectionBaseTag,
	collectionTag,
	documentBaseTag,
	documentTag,
	globalBaseTag,
	globalTag,
} from './cacheTags';

describe('cache tag helpers', () => {
	it('creates locale-aware document tags and stable base document tags', () => {
		expect(documentTag('posts', 'alpha', 'it')).toBe('posts:it:doc:alpha');
		expect(documentTag('posts', 'alpha', 'en')).toBe('posts:en:doc:alpha');
		expect(documentTag('posts', 'alpha', 'it')).not.toBe(
			documentTag('posts', 'alpha', 'en')
		);
		expect(documentBaseTag('posts', 'alpha')).toBe('posts:doc:alpha');
	});

	it('creates locale-aware collection tags and stable base collection tags', () => {
		expect(collectionTag('posts', 'it')).toBe('posts:it:list');
		expect(collectionTag('posts', 'en')).toBe('posts:en:list');
		expect(collectionTag('posts', 'it')).not.toBe(collectionTag('posts', 'en'));
		expect(collectionBaseTag('posts')).toBe('posts:list');
	});

	it('creates locale-aware global tags and stable base global tags', () => {
		expect(globalTag('home', 'it')).toBe('global:it:home');
		expect(globalTag('home', 'en')).toBe('global:en:home');
		expect(globalTag('home', 'it')).not.toBe(globalTag('home', 'en'));
		expect(globalBaseTag('home')).toBe('global:home');
	});
});
