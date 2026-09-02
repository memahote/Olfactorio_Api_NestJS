import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { atmospheres } from './atmospheres.schema';
import { and, eq, isNull, or } from 'drizzle-orm';
import { AtmosphereInsert, AtmosphereSelect } from './_utils/types/atmospheres.types';

@Injectable()
export class AtmospheresRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(atmosphereData: AtmosphereInsert): Promise<AtmosphereSelect> {
    const [atmosphere] = await this.databaseService.db
      .insert(atmospheres)
      .values(atmosphereData)
      .returning();

    return atmosphere;
  }

  async findAllUserAtmospheres(userId: string): Promise<AtmosphereSelect[]> {
    return this.databaseService.db
      .select()
      .from(atmospheres)
      .where(or(isNull(atmospheres.ownerId), eq(atmospheres.ownerId, userId)));
  }

  async findAllDefault(): Promise<AtmosphereSelect[]> {
    return this.databaseService.db
      .select()
      .from(atmospheres)
      .where(isNull(atmospheres.ownerId));
  }

  async findAllAtmosphere(): Promise<AtmosphereSelect[]> {
    return this.databaseService.db.select().from(atmospheres);
  }

  async findById(id: string): Promise<AtmosphereSelect> {
    const [atmosphere] = await this.databaseService.db
      .select()
      .from(atmospheres)
      .where(eq(atmospheres.id, id));

    return atmosphere;
  }

  async findVisibleById(
    id: string,
    userId: string,
  ): Promise<AtmosphereSelect > {
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
  ): Promise<AtmosphereSelect> {
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

  async delete(id: string, userId: string): Promise<AtmosphereSelect> {
    const [atmosphere] = await this.databaseService.db
      .delete(atmospheres)
      .where(and(eq(atmospheres.id, id), eq(atmospheres.ownerId, userId)))
      .returning();

    return atmosphere;
  }

  async deleteDefault(id: string): Promise<AtmosphereSelect> {
    const [atmosphere] = await this.databaseService.db
      .delete(atmospheres)
      .where(and(eq(atmospheres.id, id), isNull(atmospheres.ownerId)))
      .returning();

    return atmosphere;
  }
}
