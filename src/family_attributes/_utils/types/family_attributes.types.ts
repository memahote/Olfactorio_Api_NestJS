import { familyAttributes } from 'src/family_attributes/family_attributes.schema';

export type FamilyAttributesInsert = typeof familyAttributes.$inferInsert;

export type FamilyAttributesSelect = typeof familyAttributes.$inferSelect;
