import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { associatedNotes } from './associated_notes.schema';
import { AssociatedNoteInsert } from './_utils/types/associated-notes.types';

@Injectable()
export class AssociatedNotesRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async createMany(relations: AssociatedNoteInsert[]) {
  return this.databaseService.db
    .insert(associatedNotes)
    .values(relations)
    .onConflictDoNothing()
    .returning();
}


}
