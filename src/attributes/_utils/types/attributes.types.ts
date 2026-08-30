import { attributes } from "src/attributes/attributes.schema";

export type Attribute = typeof attributes.$inferSelect;

export type CreateAttribute = typeof attributes.$inferInsert;