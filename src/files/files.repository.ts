import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

import { DatabaseService } from 'src/database/database.service';
import { files } from './files.schema';
import { FileInsert } from './_utils/types/files.types';
import { TransactionHost } from '@nestjs-cls/transactional';
import { MyDrizzleAdapter } from 'src/database/_utils/types/database.types';

@Injectable()
export class FilesRepository {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly txHost: TransactionHost<MyDrizzleAdapter>,
  ) {}

  async create(data: FileInsert) {
    const [file] = await this.txHost.tx
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