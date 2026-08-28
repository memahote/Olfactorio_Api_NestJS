import { RoleEnum } from '../enums/role.enum';

export type RoleType = (typeof RoleEnum)[keyof typeof RoleEnum];
