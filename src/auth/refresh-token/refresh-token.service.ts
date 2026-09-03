import { Injectable } from '@nestjs/common';
import { RefreshTokenRepository } from './refresh-token.repository';
import { CreateRefreshToken } from './utils/types/create-refresh-token.type';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class RefreshTokenService {
  constructor(
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}

  async create(createRefreshToken: CreateRefreshToken) {
    return this.refreshTokenRepository.create(createRefreshToken);
  }

  async findByHashedToken(hashedToken: string) {
    return this.refreshTokenRepository.findByHashedToken(hashedToken);
  }

  async revoke(id: string) {
    return this.refreshTokenRepository.revoke(id);
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async deleteExpiredTokens() {
    const deleted = await this.refreshTokenRepository.deleteExpired();
  }
}
