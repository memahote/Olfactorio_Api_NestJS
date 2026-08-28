import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

export const Exceptions = {
  MISMATCH_PASSWORD: () => new BadRequestException('Password mismatch'),
  NOT_FOUND: (entity: string) => new NotFoundException(`${entity} not found`),
  BAD_REQUEST: (entity: string) => new BadRequestException(`Invalid ${entity}`),
  FORBBIDEN: (entity: string) =>
    new ForbiddenException(`${entity}: access denied`),
  INVALID_REFRESH_TOKEN: () =>
    new UnauthorizedException('Invalid refresh token'),
  ALREADY_EXIST: (entity: string) =>
    new ConflictException(`${entity} already exist`),
  WRONG_CREDENTIAL: () => new UnauthorizedException('Wrong credential'),
  INVALID_TOKEN: () => new ForbiddenException('TOKEN_EXPIRED'),
} as const;
