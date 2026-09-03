import { pgTable, primaryKey, timestamp, uuid } from 'drizzle-orm/pg-core';
import { olfactiveFamilies } from 'src/olfactive-family/olfactive-families.schema';
import { users } from 'src/users/users.schema';

export const exploredFamilies = pgTable(
  'explored_families',
  {
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, {
        onDelete: 'cascade',
      }),
    familyId: uuid('family_id')
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
    primaryKey({
      columns: [table.userId, table.familyId],
    }),
  ],
);
