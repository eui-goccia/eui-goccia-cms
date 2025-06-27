import type { Access, FieldAccess } from 'payload';

export const anyone: Access = () => true;

export const anyoneField: FieldAccess = () => true;
