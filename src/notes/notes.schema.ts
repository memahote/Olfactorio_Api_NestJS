import {
  foreignKey,
  pgEnum,
  pgTable,
  text,
  timestamp,
  unique,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { files } from 'src/files/files.schema';
import { olfactiveFamilies } from 'src/olfactive-family/olfactive-families.schema';
import { NotePyramidLevelEnum } from './_utils/enums/note-pyramid-level.enum';

export const notePyramidLevelEnum = pgEnum(
  'note_pyramid_level',
  Object.values(NotePyramidLevelEnum) as [
    string,
    ...string[],
  ],
);

export const notes = pgTable(
  'notes',
  {
    id: uuid().defaultRandom().primaryKey(),
    name: varchar('name', { length: 100 }).notNull(),
    olfactiveDescription: text('olfactive_description').notNull(),
    educationalDescription: text('educational_description').notNull(),
    pyramidLevel: notePyramidLevelEnum('pyramid_level').notNull(),
    pyramidDescription: text('pyramid_description').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),

    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow(),

    familyId: uuid()
      .notNull()
      .references(() => olfactiveFamilies.id),
    fileId: uuid()
      .notNull()
      .references(() => files.id),
    parent_note_id: uuid('parent_note_id'),
  },
  (table) => [
    foreignKey({
      columns: [table.parent_note_id],
      foreignColumns: [table.id],
      name: 'notes_parent_note_id',
    }),
    unique().on(table.name, table.familyId),
  ],
);
