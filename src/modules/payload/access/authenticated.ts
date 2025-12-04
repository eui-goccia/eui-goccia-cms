import type { User } from '@payload-types';
import type { AccessArgs, FieldAccess } from 'payload';

type isAuthenticated = (args: AccessArgs<User>) => boolean;

export const authenticated: isAuthenticated = ({ req: { user } }) =>
	Boolean(user);

export const authenticatedField: FieldAccess = ({ req: { user } }) =>
	Boolean(user);
