import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { noteImpressions } from './note_impressions.schema';
import { NoteImpressionsInsert } from './_utils/types/note-impressions.types';
import { eq } from 'drizzle-orm';
import { impressions } from 'src/impressions/impressions.schema';

@Injectable()
export class NoteImpressionsRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async createMany(relations: NoteImpressionsInsert[]) {
    return this.databaseService.db
      .insert(noteImpressions)
      .values(relations)
      .returning()
      .onConflictDoNothing();
  }

  async findByNoteId(id: string) {
    return this.databaseService.db
      .select({
        id: impressions.id,
        description: impressions.description,
      })
      .from(noteImpressions)
      .innerJoin(impressions, eq(noteImpressions.impressionId, impressions.id))
      .where(eq(noteImpressions.noteId, id));
  }
}
