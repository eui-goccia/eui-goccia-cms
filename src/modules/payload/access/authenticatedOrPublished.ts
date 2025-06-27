import type { Access, FieldAccess } from 'payload';

export const authenticatedOrPublished: Access = ({ req: { user } }) => {
	if (user) {
		return true;
	}

	return {
		_status: {
			equals: 'published',
		},
	};
};

export const authenticatedOrPublishedField: FieldAccess = ({
	req: { user },
	siblingData,
}) => {
	if (user) {
		return true;
	}

	return siblingData?._status === 'published';
};
