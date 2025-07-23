import type { Access, FieldAccess } from 'payload';

export const editorOrPublished: Access = ({ req: { user } }) => {
	if (user && (user.role === 'editor' || user.role === 'admin')) {
		return true;
	}

	return {
		_status: {
			equals: 'published',
		},
	};
};

export const editorOrPublishedField: FieldAccess = ({
	req: { user },
	siblingData,
}) => {
	if (user && (user.role === 'editor' || user.role === 'admin')) {
		return true;
	}

	return siblingData?._status === 'published';
};
