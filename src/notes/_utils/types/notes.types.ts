import { Notes } from 'src/notes/notes.schema';

export type NoteInsert = typeof Notes.$inferInsert;

export type NoteSelect = typeof Notes.$inferSelect;
