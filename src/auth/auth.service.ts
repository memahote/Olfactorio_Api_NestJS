import { Injectable } from '@nestjs/common';
import { RegisterDto } from './_utils/dtos/requests/register.dto';
import { UsersService } from 'src/users/users.service';
import { Exceptions } from 'src/_utils/exceptions/exceptions';
import { passwordsMatch } from './_utils/functions/passwords-match.function';
import { HashingService } from 'src/cryptography/hashing/hashing.service';
import { AuthMapper } from './auth.mapper';
import { RolesService } from 'src/roles/roles.service';
import { RoleEnum } from 'src/roles/utils/enums/role.enum';
import { TokenService } from './token/token.service';
import { RefreshTokenService } from './refresh-token/refresh-token.service';
import { LoginDto } from './_utils/dtos/requests/login.dto';
import { RefreshTokenDto } from './_utils/dtos/requests/refresh-token.dto';
import { UserMapper } from 'src/users/users.mapper';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashingService: HashingService,
    private readonly authMapper: AuthMapper,
    private readonly userMapper: UserMapper,
    private readonly rolesService: RolesService,
    private readonly tokenService: TokenService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  async register(registerDto: RegisterDto) {
    const user = await this.usersService.findByEmail(registerDto.email);

    if (user) {
      throw Exceptions.ALREADY_EXIST('Email');
    }

    if (!passwordsMatch(registerDto.password, registerDto.confirmPassword)) {
      throw Exceptions.MISMATCH_PASSWORD();
    }
    const hashedPassword = await this.hashingService.hashPassword(
      registerDto.password,
    );

    const userRole = await this.rolesService.findByName(RoleEnum.USER);

    if (!userRole) {
      throw Exceptions.NOT_FOUND('Role');
    }
    const createdUser = await this.usersService.createUser(
      this.authMapper.toCreateUserDto(registerDto, hashedPassword, userRole.id),
    );

    const generatedTokens = this.tokenService.generateTokens(
      this.authMapper.toJwtPayload(createdUser),
    );

    await this.refreshTokenService.create(
      this.authMapper.toCreateRefreshToken(createdUser.id, generatedTokens),
    );

    return this.authMapper.toAuthenticationResponseDto(
      createdUser,
      generatedTokens,
    );
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmailForAuth(loginDto.email);

    if (!user) {
      throw Exceptions.NOT_FOUND('User');
    }

    const passwordMatch = await this.hashingService.compare(
      loginDto.password,
      user.hashedpassword,
    );

    if (!passwordMatch) {
      throw Exceptions.WRONG_CREDENTIAL();
    }

    const generatedTokens = this.tokenService.generateTokens(
      this.authMapper.toJwtPayload(user),
    );

    await this.refreshTokenService.create(
      this.authMapper.toCreateRefreshToken(user.id, generatedTokens),
    );
    
    return this.authMapper.toAuthenticationResponseDto(this.userMapper.toGetUserDto(user), generatedTokens);
  }

  async rotateRefreshToken(refreshTokenDto: RefreshTokenDto) {
    const hashedToken = this.hashingService.hashRefreshToken(
      refreshTokenDto.refreshToken,
    );
    const refreshToken =
      await this.refreshTokenService.findByHashedToken(hashedToken);

    if (
      !refreshToken ||
      refreshToken.revokedAt ||
      refreshToken.expiresAt < new Date()
    ) {
      throw Exceptions.INVALID_REFRESH_TOKEN();
    }

    const user = await this.usersService.findById(refreshToken.userId);

    if (!user) {
      throw Exceptions.INVALID_REFRESH_TOKEN();
    }

    await this.refreshTokenService.revoke(refreshToken.id);

    const newTokens = this.tokenService.generateTokens(
      this.authMapper.toJwtPayload(user),
    );

    await this.refreshTokenService.create(
      this.authMapper.toCreateRefreshToken(user.id, newTokens),
    );
    return this.authMapper.toAuthenticationResponseDto(user, newTokens);
  }

}
