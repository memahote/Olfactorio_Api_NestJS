import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { NoteInsert, NoteSelect } from './_utils/types/notes.types';
import { Notes } from './notes.schema';
import { eq, and, isNull } from 'drizzle-orm';
import { files } from 'src/files/files.schema';

@Injectable()
export class NotesRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(note: NoteInsert): Promise<NoteSelect> {
    const [createdNote] = await this.databaseService.db
      .insert(Notes)
      .values(note)
      .returning();

    return createdNote;
  }

  async findByNameAndFamily(
    name: string,
    familyId: string,
  ): Promise<NoteSelect> {
    const [note] = await this.databaseService.db
      .select()
      .from(Notes)
      .where(and(eq(Notes.name, name), eq(Notes.familyId, familyId)))
      .limit(1);

    return note;
  }

  async findNoteById(id: string) {
    const [note] = await this.databaseService.db
      .select({
        note: Notes,
        file: files,
      })
      .from(Notes)
      .innerJoin(files, eq(Notes.fileId, files.id))
      .where(eq(Notes.id, id));

    return note;
  }

  async findNoteVariations(noteId: string) {
    const noteVariations = await this.databaseService.db
      .select({
        note: Notes,
        file: files,
      })
      .from(Notes)
      .innerJoin(files, eq(Notes.fileId, files.id))
      .where(eq(Notes.parentNoteId, noteId));

    return noteVariations;
  }

  async findNotesByFamilyId(familyId: string) {
    const notes = this.databaseService.db
      .select({
        note: Notes,
        file: files,
      })
      .from(Notes)
      .innerJoin(files, eq(Notes.fileId, files.id))
      .where(and(eq(Notes.familyId, familyId), isNull(Notes.parentNoteId)));

    return notes;
  }

  async deleteNote(id: string) {
    const [note] = await this.databaseService.db
      .delete(Notes)
      .where(eq(Notes.id, id))
      .returning();
    
    return note;
  }
}
