import { comparison } from "src/comparison/comparison.schema";
import { ComparisonEnum } from "../enums/comparison.enums";

export type ComparisonValues =
  (typeof ComparisonEnum)[keyof typeof ComparisonEnum];


export type ComparisonInsert = typeof comparison.$inferInsert

export type ComparisonSelect = typeof comparison.$inferSelect

