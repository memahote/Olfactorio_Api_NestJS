import { pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core';
import { impressions } from 'src/impressions/impressions.schema';
import { notes } from 'src/notes/notes.schema';

export const noteImpressions = pgTable(
  'note_impressions',
  {
    noteId: uuid('note_id')
      .notNull()
      .references(() => notes.id, {
        onDelete: 'cascade',
      }),
    impressionId: uuid('impression_id')
      .notNull()
      .references(() => impressions.id, {
        onDelete: 'cascade',
      }),
  },
  (table) => [
    primaryKey({
      columns: [table.noteId, table.impressionId],
    }),
  ],
);
