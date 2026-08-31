import { uuid } from 'drizzle-orm/cockroach-core';
import { pgTable, unique, varchar } from 'drizzle-orm/pg-core';
import { users } from 'src/users/users.schema';

export const feelings = pgTable(
  'feelings',
  {
    id: uuid().defaultRandom().primaryKey(),
    name: varchar('name', { length: 100 }).notNull(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, {
        onDelete: 'cascade',
      }),
  },
  (table) => [
    unique('feelings_user_id_name_unique').on(table.userId, table.name),
  ],
);
