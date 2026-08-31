import { pgTable, uuid, primaryKey } from 'drizzle-orm/pg-core';
import { attributes } from '../attributes/attributes.schema';
import { olfactiveFamilies } from 'src/olfactive-family/olfactive-families.schema';

export const familyAttributes = pgTable(
  'family_attribute',
  {
    familyId: uuid('family_id')
      .notNull()
      .references(() => olfactiveFamilies.id, {
        onDelete: 'cascade',
      }),

    attributeId: uuid('attribute_id')
      .notNull()
      .references(() => attributes.id, {
        onDelete: 'cascade',
      }),
  },
  (table) => [({
    pk: primaryKey({
      columns: [table.familyId, table.attributeId],
    }),
  })],
);
