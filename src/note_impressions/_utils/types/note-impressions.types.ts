import { noteImpressions } from 'src/note_impressions/note_impressions.schema';

export type NoteImpressionsInsert = typeof noteImpressions.$inferInsert;

export type NoteImpressionsSelect = typeof noteImpressions.$inferSelect;
