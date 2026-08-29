import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

import { DatabaseService } from 'src/database/database.service';
import { olfactiveFamilies } from './olfactive-families.schema';

@Injectable()
export class OlfactiveFamiliesRepository {
  constructor(
    private readonly databaseService: DatabaseService,
  ) {}

  async create(
    data: typeof olfactiveFamilies.$inferInsert,
  ) {
    const [olfactiveFamily] =
      await this.databaseService.db
        .insert(olfactiveFamilies)
        .values(data)
        .returning();

    return olfactiveFamily;
  }

  async findAll() {
    return this.databaseService.db
      .select()
      .from(olfactiveFamilies);
  }

  async findById(id: string) {
    const [olfactiveFamily] =
      await this.databaseService.db
        .select()
        .from(olfactiveFamilies)
        .where(eq(olfactiveFamilies.id, id));

    return olfactiveFamily;
  }

  async findByName(name: string) {
    const [olfactiveFamily] =
      await this.databaseService.db
        .select()
        .from(olfactiveFamilies)
        .where(eq(olfactiveFamilies.name, name));

    return olfactiveFamily;
  }

  async delete(id: string) {
    const [olfactiveFamily] =
      await this.databaseService.db
        .delete(olfactiveFamilies)
        .where(eq(olfactiveFamilies.id, id))
        .returning();

    return olfactiveFamily;
  }
}