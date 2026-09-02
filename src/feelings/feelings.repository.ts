import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { feelings } from './feelings.schema';
import { and, eq } from 'drizzle-orm';
import { Exceptions } from 'src/_utils/exceptions/exceptions';
import { FeelingInsert, FeelingSelect } from './_utils/types/feelings.types';

@Injectable()
export class FeelingsRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(feelingData: FeelingInsert): Promise<FeelingSelect> {
    const [feeling] = await this.databaseService.db
      .insert(feelings)
      .values(feelingData)
      .returning();

    return feeling;
  }

  async findAll(): Promise<FeelingSelect[]> {
    return this.databaseService.db.select().from(feelings);
  }

  async findById(id: string): Promise<FeelingSelect> {
    const [feeling] = await this.databaseService.db
      .select()
      .from(feelings)
      .where(eq(feelings.id, id));
    return feeling;
  }

  async findByUserIdAndName(feelingData: FeelingInsert) {
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
