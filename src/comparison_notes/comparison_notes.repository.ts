import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { ComparisonNoteInsert } from './_utils/types/comparison-notes.types';
import { comparisonNotes } from './comparison_notes.schema';
import { TransactionHost } from '@nestjs-cls/transactional';
import { MyDrizzleAdapter } from 'src/database/_utils/types/database.types';

@Injectable()
export class ComparisonNotesRepository {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly txHost: TransactionHost<MyDrizzleAdapter>,
  ) {}

  async createMany(relations: ComparisonNoteInsert[]) {
    return this.txHost.tx.insert(comparisonNotes).values(relations).returning();
  }
}
