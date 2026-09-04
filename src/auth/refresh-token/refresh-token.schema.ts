import { pgTable, index, text, timestamp, uuid} from 'drizzle-orm/pg-core';
import { users } from 'src/users/users.schema';

export const refreshToken = pgTable(
  'refresh_tokens',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    hashedToken: text('hashed_token').notNull().unique(),

    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),

    expiresAt: timestamp('expires_at', {
      withTimezone: true,
    }).notNull(),

    revokedAt: timestamp('revoked_at', {
      withTimezone: true,
    }),
  },
  (table) => [
    index('refresh_tokens_expires_at_index').on(table.expiresAt),
    index('refresh_tokens_user_id_index').on(table.userId),
  ],
);
