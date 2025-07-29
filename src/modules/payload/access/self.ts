import type { Access } from 'payload';

export const self: Access = ({ req: { user } }) => {
	if (user?.role === 'admin') {
		return true;
	}

	return {
		id: {
			equals: user?.id,
		},
	};
};

export const selfOrEditor: Access = ({ req: { user } }) => {
	if (user?.role === 'admin' || user?.role === 'editor') {
		return true;
	}

	return {
		id: {
			equals: user?.id,
		},
	};
};
