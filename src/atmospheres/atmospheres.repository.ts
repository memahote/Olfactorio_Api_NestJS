import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { atmospheres } from './atmospheres.schema';
import { and, eq, isNull, or } from 'drizzle-orm';
import {
  AtmosphereInsert,
  AtmosphereSelect,
} from './_utils/types/atmospheres.types';
import { files } from 'src/files/files.schema';

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

  async findAllUserAtmospheres(userId: string) {
    return this.databaseService.db
      .select({
        id: atmospheres.id,
        name: atmospheres.name,
        ownerId: atmospheres.ownerId,
        fileId: atmospheres.fileId,
        file: files,
      })
      .from(atmospheres)
      .innerJoin(files, eq(atmospheres.fileId, files.id))
      .where(or(isNull(atmospheres.ownerId), eq(atmospheres.ownerId, userId)));
  }

  async findAllDefault() {
    return this.databaseService.db
      .select({
        id: atmospheres.id,
        name: atmospheres.name,
        ownerId: atmospheres.ownerId,
        file: files,
      })
      .from(atmospheres)
      .innerJoin(files, eq(atmospheres.fileId, files.id))
      .where(isNull(atmospheres.ownerId));
  }

  async findAllAtmosphere() {
    return this.databaseService.db
      .select({
        id: atmospheres.id,
        name: atmospheres.name,
        ownerId: atmospheres.ownerId,
        file: files,
      })
      .from(atmospheres)
      .innerJoin(files, eq(atmospheres.fileId, files.id));
  }

  async findById(id: string) {
    const [atmosphere] = await this.databaseService.db
      .select({
        id: atmospheres.id,
        name: atmospheres.name,
        ownerId: atmospheres.ownerId,
        file: files,
      })
      .from(atmospheres)
      .innerJoin(files, eq(atmospheres.fileId, files.id))
      .where(eq(atmospheres.id, id));

    return atmosphere;
  }

  async findVisibleById(id: string, userId: string) {
    const [atmosphere] = await this.databaseService.db
      .select({
        id: atmospheres.id,
        name: atmospheres.name,
        ownerId: atmospheres.ownerId,
        file: files,
      })
      .from(atmospheres)
      .innerJoin(files, eq(atmospheres.fileId, files.id))
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
