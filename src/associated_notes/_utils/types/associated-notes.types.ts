import { associatedNotes } from "src/associated_notes/associated_notes.schema";

export type AssociatedNoteInsert = typeof associatedNotes.$inferInsert

export type AssociatedNoteSelect = typeof associatedNotes.$inferSelect