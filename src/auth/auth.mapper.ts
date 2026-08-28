import { Injectable } from '@nestjs/common';
import { GeneratedTokens } from './token/utils/types/generated-tokens.type';
import { HashingService } from 'src/cryptography/hashing/hashing.service';
import { CreateRefreshToken } from './refresh-token/utils/types/create-refresh-token.type';
import { users } from 'src/users/users.schema';
import { RegisterDto } from './_utils/dtos/requests/register.dto';
import { CreateUserDto } from 'src/users/_utils/dtos/requests/create-user.dto';
import { GetUserDto } from 'src/users/_utils/dtos/responses/get-user.dto';
import { JwtPayload } from './token/utils/types/jwt-payload.type';
import { AuthResponseDto } from './_utils/dtos/responses/auth-response.dto';

@Injectable()
export class AuthMapper {
  constructor(
    private readonly hashingService: HashingService,
  ) { }
  toCreateUserDto = (
    user: RegisterDto,
    hashedPassword: string,
    roleId: string,
  ): CreateUserDto => ({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    hashedpassword: hashedPassword,
    roleId: roleId,
  });

  toAuthenticationResponseDto = (
    user: GetUserDto,
    tokens: GeneratedTokens,
  ): AuthResponseDto => ({
    user,
    tokens,
  });

  toJwtPayload = (createdUser: GetUserDto): JwtPayload => ({
    id: createdUser.id,
  });

  toCreateRefreshToken = (
    userId: string,
    tokens: GeneratedTokens,
  ): CreateRefreshToken => ({
    userId: userId,
    hashedToken: this.hashingService.hashRefreshToken(tokens.refreshToken),
    expiresAt: tokens.expiresAt,
  });
  
}
