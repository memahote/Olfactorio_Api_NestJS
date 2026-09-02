import { notes } from 'src/notes/notes.schema';

export type NoteInsert = typeof notes.$inferInsert;

export type NoteSelect = typeof notes.$inferSelect;
