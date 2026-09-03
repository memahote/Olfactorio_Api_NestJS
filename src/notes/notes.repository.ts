import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { NoteInsert, NoteSelect } from './_utils/types/notes.types';
import { notes } from './notes.schema';
import { eq, and, isNull, sql } from 'drizzle-orm';
import { files } from 'src/files/files.schema';
import { noteAttributes } from 'src/note_attributes/note_attributes.schema';
import { attributes } from 'src/attributes/attributes.schema';
import { AttributeSelect } from 'src/attributes/_utils/types/attributes.types';

@Injectable()
export class NotesRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(note: NoteInsert): Promise<NoteSelect> {
    const [createdNote] = await this.databaseService.db
      .insert(notes)
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
      .from(notes)
      .where(and(eq(notes.name, name), eq(notes.familyId, familyId)))
      .limit(1);

    return note;
  }

  async findNoteById(id: string) {
    const [note] = await this.databaseService.db
      .select({
        note: notes,
        file: files,
        attributes: sql<AttributeSelect[]>`
      json_agg(${attributes})
    `,
      })
      .from(notes)
      .innerJoin(files, eq(notes.fileId, files.id))
      .innerJoin(noteAttributes, eq(noteAttributes.noteId, notes.id))
      .innerJoin(attributes, eq(attributes.id, noteAttributes.attributeId))
      .where(eq(notes.id, id))
      .groupBy(notes.id, files.id);

    return note;
  }

  async findNoteVariations(noteId: string) {
    const noteVariations = await this.databaseService.db
      .select({
        note: notes,
        file: files,
        attributes: sql<AttributeSelect[]>`
      json_agg(${attributes})
    `,
      })
      .from(notes)
      .innerJoin(files, eq(notes.fileId, files.id))
      .innerJoin(noteAttributes, eq(noteAttributes.noteId, notes.id))
      .innerJoin(attributes, eq(attributes.id, noteAttributes.attributeId))
      .where(eq(notes.parentNoteId, noteId))
      .groupBy(notes.id, files.id);

    return noteVariations;
  }

  async findNotesByFamilyId(familyId: string) {
    const noteList = this.databaseService.db
      .select({
        note: notes,
        file: files,
        attributes: sql<AttributeSelect[]>`
      json_agg(${attributes})
    `,
      })
      .from(notes)
      .innerJoin(files, eq(notes.fileId, files.id))
      .innerJoin(noteAttributes, eq(noteAttributes.noteId, notes.id))
      .innerJoin(attributes, eq(attributes.id, noteAttributes.attributeId))
      .where(and(eq(notes.familyId, familyId), isNull(notes.parentNoteId)))
      .groupBy(notes.id, files.id);

    return noteList;
  }

  async deleteNote(id: string) {
    const [note] = await this.databaseService.db
      .delete(notes)
      .where(eq(notes.id, id))
      .returning();

    return note;
  }
}
