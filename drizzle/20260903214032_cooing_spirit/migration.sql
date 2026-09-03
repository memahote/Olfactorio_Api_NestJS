CREATE TABLE "note_attribute" (
	"note_id" uuid NOT NULL,
	"attribute_id" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "explored_notes" DROP CONSTRAINT "explored_notes_note_id_olfactive_families_id_fkey";--> statement-breakpoint
ALTER TABLE "favorite_notes" DROP CONSTRAINT "favorite_notes_note_id_olfactive_families_id_fkey";--> statement-breakpoint
ALTER TABLE "explored_notes" ADD CONSTRAINT "explored_notes_note_id_notes_id_fkey" FOREIGN KEY ("note_id") REFERENCES "notes"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "favorite_notes" ADD CONSTRAINT "favorite_notes_note_id_notes_id_fkey" FOREIGN KEY ("note_id") REFERENCES "notes"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "note_attribute" ADD CONSTRAINT "note_attribute_note_id_notes_id_fkey" FOREIGN KEY ("note_id") REFERENCES "notes"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "note_attribute" ADD CONSTRAINT "note_attribute_attribute_id_attributes_id_fkey" FOREIGN KEY ("attribute_id") REFERENCES "attributes"("id") ON DELETE CASCADE;