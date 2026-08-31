import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateImpression, Impression } from './_utils/types/impressions.type';
import { impressions } from './impressions.schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class ImpressionsRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(impressionData: CreateImpression): Promise<Impression> {
    const [impression] = await this.databaseService.db
      .insert(impressions)
      .values(impressionData)
      .returning();

    return impression;
  }

  async findAll(): Promise<Impression[]> {
    return this.databaseService.db.select().from(impressions);
  }

  async findById(id: string): Promise<Impression> {
    const [impression] = await this.databaseService.db
      .select()
      .from(impressions)
      .where(eq(impressions.id, id));

    return impression;
  }

  async findByDescription(description: string): Promise<Impression> {
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
