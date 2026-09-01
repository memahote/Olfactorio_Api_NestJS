import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Atmosphere, CreateAtmosphere } from './_utils/types/atmospheres.types';
import { atmospheres } from './atmospheres.schema';
import { and, eq, isNull, or } from 'drizzle-orm';

@Injectable()
export class AtmospheresRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(atmosphereData: CreateAtmosphere): Promise<Atmosphere> {
    const [atmosphere] = await this.databaseService.db
      .insert(atmospheres)
      .values(atmosphereData)
      .returning();

    return atmosphere;
  }

  async findAllVisibleForUser(userId: string): Promise<Atmosphere[]> {
    return this.databaseService.db
      .select()
      .from(atmospheres)
      .where(or(isNull(atmospheres.ownerId), eq(atmospheres.ownerId, userId)));
  }

  async findAllDefault(): Promise<Atmosphere[]> {
    return this.databaseService.db
      .select()
      .from(atmospheres)
      .where(isNull(atmospheres.ownerId));
  }

  async findById(id: string): Promise<Atmosphere> {
    const [atmosphere] = await this.databaseService.db
      .select()
      .from(atmospheres)
      .where(eq(atmospheres.id, id));

    return atmosphere;
  }

  async findVisibleById(
    id: string,
    userId: string,
  ): Promise<Atmosphere | undefined> {
    const [atmosphere] = await this.databaseService.db
      .select()
      .from(atmospheres)
      .where(
        and(
          eq(atmospheres.id, id),
          or(isNull(atmospheres.ownerId), eq(atmospheres.ownerId, userId)),
        ),
      );

    return atmosphere;
  }

  async findByOwnerIdAndName(
    ownerId: string,
    name: string,
  ): Promise<Atmosphere> {
    const [atmosphere] = await this.databaseService.db
      .select()
      .from(atmospheres)
      .where(and(eq(atmospheres.ownerId, ownerId), eq(atmospheres.name, name)))
      .limit(1);

    return atmosphere;
  }

  async findDefaultByName(name: string) {
    const [atmosphere] = await this.databaseService.db
      .select()
      .from(atmospheres)
      .where(and(isNull(atmospheres.ownerId), eq(atmospheres.name, name)))
      .limit(1);

    return atmosphere;
  }

  async delete(id: string): Promise<Atmosphere> {
    const [atmosphere] = await this.databaseService.db
      .delete(atmospheres)
      .where(eq(atmospheres.id, id))
      .returning();

    return atmosphere;
  }
}
