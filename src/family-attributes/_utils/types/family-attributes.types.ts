import { familyAttributes } from "src/family-attributes/family-attributes.schema";

export type FamilyAttributesInsert = typeof familyAttributes.$inferInsert;

export type FamilyAttributesSelect = typeof familyAttributes.$inferSelect;
