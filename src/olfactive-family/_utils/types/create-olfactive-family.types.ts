import { olfactiveFamilies } from "src/olfactive-family/olfactive-families.schema";


export type OlfactiveFamilies = typeof olfactiveFamilies.$inferSelect;

export type CreatedOlfactiveFamilies  = typeof olfactiveFamilies.$inferInsert;