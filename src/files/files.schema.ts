import { numeric, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const files = pgTable('files', {
  id: uuid('id').defaultRandom().primaryKey(),

  bucket: varchar('bucket', { length: 255 }).notNull(),

  key: varchar('key', { length: 255 }).notNull(),

  fileName: varchar('file_name', { length: 255 }).notNull(),

  mimeType: varchar('mime_type', { length: 255 }).notNull(),

  size: numeric('size').notNull(),
});