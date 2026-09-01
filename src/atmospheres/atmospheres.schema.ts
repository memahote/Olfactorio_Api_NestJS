import { uuid, pgTable, unique, varchar } from 'drizzle-orm/pg-core';
import { files } from 'src/files/files.schema';
import { users } from 'src/users/users.schema';

export const atmospheres = pgTable(
  'atmospheres',
  {
    id: uuid().defaultRandom().primaryKey(),
    name: varchar('name', { length: 100 }).notNull(),
    ownerId: uuid('owner_id')
      .references(() => users.id),
    fileId: uuid('file_id')
      .notNull()
      .references(() => files.id),
  },
  (table) => [
    unique('atmospheres_user_id_name_unique').on(table.ownerId, table.name),
  ],
);
