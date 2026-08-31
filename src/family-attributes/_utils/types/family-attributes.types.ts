import { familyAttributes } from "src/family-attributes/family-attributes.schema";

export type FamilyAttributes = typeof familyAttributes.$inferSelect;

export type CreateFamilyAttributes  = typeof familyAttributes.$inferInsert;