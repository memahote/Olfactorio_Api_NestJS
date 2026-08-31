import { impressions } from "src/impressions/impressions.schema";

export type Impression = typeof impressions.$inferSelect;

export type CreateImpression  = typeof impressions.$inferInsert;