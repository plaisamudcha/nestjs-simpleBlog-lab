import { ROLE } from '../constants/role.constant';

export type UserRole = (typeof ROLE)[keyof typeof ROLE];
