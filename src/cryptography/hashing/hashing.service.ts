import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { createHash } from 'crypto';

@Injectable()
export class HashingService {
  private readonly SALT_ROUND: number;

  constructor(private readonly configService: ConfigService) {
    this.SALT_ROUND = Number(
      this.configService.getOrThrow<string>('SALT_ROUND'),
    );
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.SALT_ROUND);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  hashRefreshToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }
}
