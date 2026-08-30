import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

export const attributes = pgTable('attributes', {
  id: uuid().defaultRandom().primaryKey(),
  name: varchar('name', { length: 100 }).unique().notNull(),
});
