import { feelings } from "src/feelings/feelings.schema";

export type Feelings = typeof feelings.$inferSelect;

export type CreateFeelings = typeof feelings.$inferInsert;