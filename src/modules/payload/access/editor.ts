import type { Access, FieldAccess } from 'payload';

export const editor: Access = ({ req: { user } }) => {
	return user?.role === 'editor' || user?.role === 'admin';
};

export const editorField: FieldAccess = ({ req: { user } }) => {
	return user?.role === 'editor' || user?.role === 'admin';
};
