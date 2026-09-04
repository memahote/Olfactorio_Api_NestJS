import { pgTable, uuid, primaryKey } from 'drizzle-orm/pg-core';
import { notes } from 'src/notes/notes.schema';

export const associatedNotes = pgTable(
  'associated_notes',
  {
    noteId: uuid('note_id')
      .notNull()
      .references(() => notes.id, {
        onDelete: 'cascade',
      }),
    associatedNoteId: uuid('associated_note_id')
      .notNull()
      .references(() => notes.id, {
        onDelete: 'cascade',
      }),
  },
  (table) => [
    primaryKey({
      columns: [table.noteId, table.associatedNoteId],
    }),
  ],
);
