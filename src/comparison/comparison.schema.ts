import { pgTable, uuid, pgEnum, timestamp } from 'drizzle-orm/pg-core';
import { ComparisonEnum } from './_utils/enums/comparison.enums';
import { users } from 'src/users/users.schema';

export const comparisonEnum = pgEnum('comparison', [
  ComparisonEnum.NOTE,
  ComparisonEnum.VARIATION,
]);

export const comparison = pgTable('comparison', {
  id: uuid().defaultRandom().primaryKey(),
  type: comparisonEnum().notNull(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, {
      onDelete: 'cascade',
    }),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
