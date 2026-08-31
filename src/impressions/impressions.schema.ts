import { uuid } from 'drizzle-orm/cockroach-core';
import { pgTable, text } from 'drizzle-orm/pg-core';

export const impressions = pgTable('impressions', {
  id: uuid().defaultRandom().primaryKey(),
  description: text('description').unique().notNull(),
});
