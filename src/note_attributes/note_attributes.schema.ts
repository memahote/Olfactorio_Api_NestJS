import { pgTable, uuid, primaryKey } from 'drizzle-orm/pg-core';
import { attributes } from '../attributes/attributes.schema';
import { notes } from 'src/notes/notes.schema';

export const noteAttributes = pgTable(
  'note_attributes',
  {
    noteId: uuid('note_id')
      .notNull()
      .references(() => notes.id, {
        onDelete: 'cascade',
      }),

    attributeId: uuid('attribute_id')
      .notNull()
      .references(() => attributes.id, {
        onDelete: 'cascade',
      }),
  },
  (table) => [
    primaryKey({
      columns: [table.noteId, table.attributeId],
    }),
  ],
);
