import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

import { DatabaseService } from 'src/database/database.service';
import { ComparisonNoteInsert } from './_utils/types/comparison-notes.types';
import { comparisonNotes } from './comparison_notes.schema';

@Injectable()
export class ComparisonNotesRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async createMany(
    relations: ComparisonNoteInsert[],
    tx = this.databaseService.db,
  ) {
    return tx.insert(comparisonNotes).values(relations).returning();
  }
}
