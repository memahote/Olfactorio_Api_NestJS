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

export const notePyramidLevelEnum = pgEnum('note_pyramid_level', [
  NotePyramidLevelEnum.TOP,
  NotePyramidLevelEnum.MIDDLE,
  NotePyramidLevelEnum.BASE,
]);

export const Notes = pgTable(
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
      .references(() => olfactiveFamilies.id, {
        onDelete: 'cascade',
      }),
    fileId: uuid()
      .notNull()
      .references(() => files.id),
    parentNoteId: uuid('parent_note_id'),
  },
  (table) => [
    foreignKey({
      columns: [table.parentNoteId],
      foreignColumns: [table.id],
      name: 'notes_parent_note_id',
    }).onDelete('cascade'),
    unique().on(table.name, table.familyId),
  ],
);
