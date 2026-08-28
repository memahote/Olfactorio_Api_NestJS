import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './utils/types/jwt-payload.type';
import { randomBytes } from 'crypto';
import { ConfigService } from '@nestjs/config';
import dayjs from 'dayjs';
import { GeneratedTokens } from './utils/types/generated-tokens.type';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  generateTokens(jwtPayload: JwtPayload): GeneratedTokens {
    const accessToken = this.jwtService.sign(jwtPayload);

    const refreshToken = randomBytes(40).toString('hex');
    const expiresAt = dayjs()
      .add(
        this.configService.getOrThrow('REFRESH_TOKEN_EXPIRATION_DAYS'),
        'day',
      )
      .toDate();

    return {
      accessToken,
      refreshToken,
      expiresAt,
    };
  }
}
