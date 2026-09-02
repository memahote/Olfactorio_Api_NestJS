import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { impressions } from './impressions.schema';
import { eq } from 'drizzle-orm';
import { ImpressionInsert, ImpressionSelect } from './_utils/types/impressions.type';

@Injectable()
export class ImpressionsRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(impressionData: ImpressionInsert): Promise<ImpressionSelect> {
    const [impression] = await this.databaseService.db
      .insert(impressions)
      .values(impressionData)
      .returning();

    return impression;
  }

  async findAll(): Promise<ImpressionSelect[]> {
    return this.databaseService.db.select().from(impressions);
  }

  async findById(id: string): Promise<ImpressionSelect> {
    const [impression] = await this.databaseService.db
      .select()
      .from(impressions)
      .where(eq(impressions.id, id));

    return impression;
  }

  async findByDescription(description: string): Promise<ImpressionSelect> {
     const [impression] = await this.databaseService.db
      .select()
      .from(impressions)
      .where(eq(impressions.description, description));

    return impression;
  }

  async delete(id: string) {
    const [impression] = await this.databaseService.db
      .delete(impressions)
      .where(eq(impressions.id, id))
      .returning();

    return impression;
  }
}
