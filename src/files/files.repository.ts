import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

import { DatabaseService } from 'src/database/database.service';
import { files } from './files.schema';
import { Files } from './_utils/types/files.types';

@Injectable()
export class FilesRepository {
  constructor(
    private readonly databaseService: DatabaseService,
  ) {}

  async create(data: typeof files.$inferInsert) {
    const [file] = await this.databaseService.db
      .insert(files)
      .values(data)
      .returning();

    return file;
  }

  async findById(id: string) {
    const [file] = await this.databaseService.db
      .select()
      .from(files)
      .where(eq(files.id, id));

    return file;
  }

  async delete(id: string) {
    const [file] = await this.databaseService.db
      .delete(files)
      .where(eq(files.id, id))
      .returning();

    return file;
  }
}