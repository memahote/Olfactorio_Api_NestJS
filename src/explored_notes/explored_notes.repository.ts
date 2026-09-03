import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { exploredNotes } from './explored_notes.schema';

@Injectable()
export class ExploredNotesRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(noteId: string, userId: string) {
    return this.databaseService.db
      .insert(exploredNotes)
      .values({ userId, noteId })
      .onConflictDoNothing();
  }
}
