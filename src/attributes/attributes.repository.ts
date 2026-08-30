import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { attributes } from './attributes.schema';
import { eq } from 'drizzle-orm';
import { Attribute, CreateAttribute } from './_utils/types/attributes.types';

@Injectable()
export class AttributesRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(data: CreateAttribute): Promise<Attribute> {
    const [attribute] = await this.databaseService.db
      .insert(attributes)
      .values(data)
      .returning();

    return attribute;
  }

  async findAll(): Promise<Attribute[]> {
    return this.databaseService.db.select().from(attributes);
  }

  async findById(id: string): Promise<Attribute> {
    const [attribute] = await this.databaseService.db
      .select()
      .from(attributes)
      .where(eq(attributes.id, id));

    return attribute;
  }

  async findByName(name: string): Promise<Attribute> {
    const [attribute] = await this.databaseService.db
      .select()
      .from(attributes)
      .where(eq(attributes.name, name));

    return attribute;
  }

  async delete(id: string): Promise<Attribute> {
    const [attribute] = await this.databaseService.db
      .delete(attributes)
      .where(eq(attributes.id, id))
      .returning();

    return attribute;
  }
}
