import { feelings } from 'src/feelings/feelings.schema';

export type FeelingInsert = typeof feelings.$inferInsert;

export type FeelingSelect = typeof feelings.$inferSelect;
