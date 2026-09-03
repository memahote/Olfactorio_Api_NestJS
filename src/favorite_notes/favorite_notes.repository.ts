import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { favoriteNotes } from './favorite_notes.schema';
import { and, eq } from 'drizzle-orm';

@Injectable()
export class FavoriteNotesRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(userId: string, noteId: string) {
    return this.databaseService.db
      .insert(favoriteNotes)
      .values({ userId, noteId })
      .onConflictDoNothing();
  }

  async delete(userId: string, noteId: string) {
    return this.databaseService.db
      .delete(favoriteNotes)
      .where(
        and(eq(favoriteNotes.userId, userId), eq(favoriteNotes.noteId, noteId)),
      );
  }
}
