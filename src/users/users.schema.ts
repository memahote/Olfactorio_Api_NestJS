import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { roles } from 'src/roles/roles.schema';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),

  firstName: varchar('first_name', { length: 255 }).notNull(),

  lastName: varchar('last_name', { length: 255 }).notNull(),

  email: varchar('email', { length: 255 }).notNull().unique(),

  hashedpassword: varchar('hashed_password', { length: 255 }).notNull(),

  roleId: uuid('role_id').notNull().references(() => roles.id),

  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
