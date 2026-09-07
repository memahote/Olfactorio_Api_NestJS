import { Injectable } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
import { DatabaseService } from 'src/database/database.service';
import { comparison } from './comparison.schema';
import { ComparisonInsert } from './_utils/types/comparison.types';
import { TransactionHost } from '@nestjs-cls/transactional';
import { MyDrizzleAdapter } from 'src/database/_utils/types/database.types';

@Injectable()
export class ComparisonRepository {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly txHost: TransactionHost<MyDrizzleAdapter>,
  ) {}

  async create(comparisonData: ComparisonInsert) {
    const [createdComparison] = await this.txHost.tx
      .insert(comparison)
      .values(comparisonData)
      .returning();

    return createdComparison;
  }

  async findAll(userId: string) {
    return this.databaseService.db
      .select()
      .from(comparison)
      .where(eq(comparison.userId, userId));
  }

  async findById(comparisonId: string, userId: string) {
    const [foundComparison] = await this.databaseService.db
      .select()
      .from(comparison)
      .where(
        and(eq(comparison.id, comparisonId), eq(comparison.userId, userId)),
      );

    return foundComparison;
  }

  async delete(comparisonId: string, userId: string) {
    const [deletedComparison] = await this.databaseService.db
      .delete(comparison)
      .where(
        and(eq(comparison.id, comparisonId), eq(comparison.userId, userId)),
      )
      .returning();

    return deletedComparison;
  }
}
