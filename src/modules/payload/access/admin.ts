import type { Access, FieldAccess } from 'payload';

export const admin: Access = ({ req: { user } }) => user?.role === 'admin';

export const adminField: FieldAccess = ({ req: { user } }) =>
	user?.role === 'admin';
