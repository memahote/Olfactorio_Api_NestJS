import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { files } from 'src/files/files.schema';

export const olfactiveFamilies = pgTable('olfactive_families', {
  id: uuid().defaultRandom().primaryKey(),

  name: varchar('name', { length: 100 }).unique().notNull(),

  description: text('description').notNull(),

  fileId: uuid('file_id')
    .notNull()
    .references(() => files.id),

  primaryColor: varchar('primary_color', { length: 7 }).notNull(),

  secondaryColor: varchar('secondary_color', { length: 7 }).notNull(),

  createdAt: timestamp('created_at', {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),

  updatedAt: timestamp('updated_at', {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
});
