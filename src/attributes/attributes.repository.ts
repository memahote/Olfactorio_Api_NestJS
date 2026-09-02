import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { attributes } from './attributes.schema';
import { eq } from 'drizzle-orm';
import { AttributeInsert, AttributeSelect } from './_utils/types/attributes.types';

@Injectable()
export class AttributesRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(data: AttributeInsert): Promise<AttributeSelect> {
    const [attribute] = await this.databaseService.db
      .insert(attributes)
      .values(data)
      .returning();

    return attribute;
  }

  async findAll(): Promise<AttributeSelect[]> {
    return this.databaseService.db.select().from(attributes);
  }

  async findById(id: string): Promise<AttributeSelect> {
    const [attribute] = await this.databaseService.db
      .select()
      .from(attributes)
      .where(eq(attributes.id, id));

    return attribute;
  }

  async findByName(name: string): Promise<AttributeSelect> {
    const [attribute] = await this.databaseService.db
      .select()
      .from(attributes)
      .where(eq(attributes.name, name));

    return attribute;
  }

  async delete(id: string): Promise<AttributeSelect> {
    const [attribute] = await this.databaseService.db
      .delete(attributes)
      .where(eq(attributes.id, id))
      .returning();

    return attribute;
  }
}
