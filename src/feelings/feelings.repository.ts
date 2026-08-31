import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateFeelings, Feelings } from './_utils/types/feelings.types';
import { feelings } from './feelings.schema';
import { and, eq } from 'drizzle-orm';
import { Exceptions } from 'src/_utils/exceptions/exceptions';

@Injectable()
export class FeelingsRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(feelingData: CreateFeelings): Promise<Feelings> {
    const [feeling] = await this.databaseService.db
      .insert(feelings)
      .values(feelingData)
      .returning();

    return feeling;
  }

  async findAll(): Promise<Feelings[]> {
    return this.databaseService.db.select().from(feelings);
  }

  async findById(id: string): Promise<Feelings> {
    const [feeling] = await this.databaseService.db
      .select()
      .from(feelings)
      .where(eq(feelings.id, id));
    return feeling;
  }

  async findByUserIdAndName(feelingData: CreateFeelings) {
    const [feeling] = await this.databaseService.db
      .select()
      .from(feelings)
      .where(
        and(
          eq(feelings.userId, feelingData.userId),
          eq(feelings.name, feelingData.name),
        ),
      )
      .limit(1);

    return feeling;
  }

  async delete(id: string) {
    const [feeling] = await this.databaseService.db
      .delete(feelings)
      .where(eq(feelings.id, id))
      .returning();

    return feeling;
  }
}
