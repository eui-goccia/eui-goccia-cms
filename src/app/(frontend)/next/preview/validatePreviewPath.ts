const PROTOCOL_PATTERN = /^[a-z][a-z0-9+.-]*:\/\//i;
const LEADING_SLASHES_PATTERN = /^\/+/;

function decodePath(path: string): string | null {
	try {
		return decodeURIComponent(path);
	} catch {
		return null;
	}
}

function hasUnsafePathSyntax(path: string): boolean {
	const decodedPath = decodePath(path);

	if (!decodedPath) {
		return true;
	}

	if (!(path.startsWith('/') && decodedPath.startsWith('/'))) {
		return true;
	}

	if (path.includes('//') || decodedPath.includes('//')) {
		return true;
	}

	const segments = decodedPath.split('/').filter(Boolean);

	if (segments.includes('..')) {
		return true;
	}

	return PROTOCOL_PATTERN.test(
		decodedPath.replace(LEADING_SLASHES_PATTERN, '')
	);
}

export function isValidPreviewPath({
	collection,
	path,
	slug,
}: {
	collection: string;
	path: string;
	slug: string;
}): boolean {
	if (hasUnsafePathSyntax(path)) {
		return false;
	}

	const decodedPath = decodePath(path);

	if (!decodedPath) {
		return false;
	}

	switch (collection) {
		case 'posts':
			return decodedPath === `/blog/${slug}`;
		case 'resources':
			return decodedPath === `/risorse/${slug}`;
		case 'events': {
			const segments = decodedPath.split('/').filter(Boolean);

			return segments[0] === 'eventi' && segments.includes(slug);
		}
		default:
			return false;
	}
}
