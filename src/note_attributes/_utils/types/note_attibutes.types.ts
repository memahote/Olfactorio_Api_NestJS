import { noteAttributes } from "src/note_attributes/note_attributes.schema";

export type NoteAttributeInsert = typeof noteAttributes.$inferInsert

export type NoteAttributeSelect = typeof noteAttributes.$inferSelect