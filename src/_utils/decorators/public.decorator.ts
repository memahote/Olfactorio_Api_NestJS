import { applyDecorators, SetMetadata } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

export const IS_PUBLIC_KEY = 'isPublic';

export function Public() {
  return applyDecorators(SetMetadata(IS_PUBLIC_KEY, true), ApiBearerAuth());
}
