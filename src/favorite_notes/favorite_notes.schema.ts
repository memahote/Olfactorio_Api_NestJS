import { pgTable, primaryKey, timestamp, uuid } from 'drizzle-orm/pg-core';
import { olfactiveFamilies } from 'src/olfactive-family/olfactive-families.schema';
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
      .references(() => olfactiveFamilies.id, {
        onDelete: 'cascade',
      }),
    createdAt: timestamp('created_at', {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    {
      pk: primaryKey({
        columns: [table.userId, table.noteId],
      }),
    },
  ],
);