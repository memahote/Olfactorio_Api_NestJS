import { attributes } from 'src/attributes/attributes.schema';

export type AttributeInsert = typeof attributes.$inferInsert;

export type AttributeSelect = typeof attributes.$inferSelect;
