import { applyDecorators, SetMetadata } from '@nestjs/common';
import { RoleType } from 'src/roles/utils/types/role.type';

export const ROLES_KEY = 'roles';

export function Roles(...roles: RoleType[]) {
  return applyDecorators(SetMetadata(ROLES_KEY, roles));
}
