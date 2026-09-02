import { impressions } from 'src/impressions/impressions.schema';

export type ImpressionInsert = typeof impressions.$inferInsert;

export type ImpressionSelect = typeof impressions.$inferSelect;
