import { pgTable, primaryKey, timestamp, uuid } from 'drizzle-orm/pg-core';
import { notes } from 'src/notes/notes.schema';
import { users } from 'src/users/users.schema';

export const favoriteNotes = pgTable(
  'favorite_notes',
  {
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, {
        onDelete: 'cascade',
      }),
    noteId: uuid('note_id')
      .notNull()
      .references(() => notes.id, {
        onDelete: 'cascade',
      }),
    createdAt: timestamp('created_at', {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    primaryKey({
      columns: [table.userId, table.noteId],
    }),
  ],
);
