import { Injectable } from '@nestjs/common';
import { refreshToken } from './refresh-token.schema';
import { CreateRefreshToken } from './utils/types/create-refresh-token.type';
import { DatabaseService } from 'src/database/database.service';
import { eq, lt } from 'drizzle-orm';

@Injectable()
export class RefreshTokenRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createRefreshToken: CreateRefreshToken): Promise<void> {
    await this.databaseService.db.insert(refreshToken).values({
      userId: createRefreshToken.userId,
      hashedToken: createRefreshToken.hashedToken,
      expiresAt: createRefreshToken.expiresAt,
    });
  }

  async findByHashedToken(hashedToken: string) {
    const [token] = await this.databaseService.db
      .select()
      .from(refreshToken)
      .where(eq(refreshToken.hashedToken, hashedToken))
      .limit(1);

    return token;
  }

  async revoke(id: string) {
    return this.databaseService.db
      .update(refreshToken)
      .set({
        revokedAt: new Date(),
      })
      .where(eq(refreshToken.id, id))
      .returning();
  }

  async deleteExpired() {
    return this.databaseService.db
      .delete(refreshToken)
      .where(lt(refreshToken.expiresAt, new Date()));
  }
}
