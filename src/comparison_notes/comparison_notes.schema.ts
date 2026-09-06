import { primaryKey } from 'drizzle-orm/cockroach-core';
import { pgTable, uuid } from 'drizzle-orm/pg-core';
import { comparison } from 'src/comparison/comparison.schema';
import { notes } from 'src/notes/notes.schema';

export const comparisonNotes = pgTable(
  'comparison_notes',
  {
    comparisonId: uuid('comparison_id')
      .notNull()
      .references(() => comparison.id, {
        onDelete: 'cascade',
      }),
    noteId: uuid('note_id')
      .notNull()
      .references(() => notes.id, {
        onDelete: 'cascade',
      }),
  },
  (table) => [
    primaryKey({
      columns: [table.comparisonId, table.noteId],
    }),
  ],
);
