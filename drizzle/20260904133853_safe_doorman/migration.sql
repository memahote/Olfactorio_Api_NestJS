CREATE TABLE "associated_notes" (
	"note_id" uuid,
	"associated_note_id" uuid,
	CONSTRAINT "associated_notes_pkey" PRIMARY KEY("note_id","associated_note_id")
);
--> statement-breakpoint
ALTER TABLE "notes" RENAME COLUMN "familyId" TO "family_id";--> statement-breakpoint
ALTER TABLE "notes" RENAME COLUMN "fileId" TO "file_id";--> statement-breakpoint
ALTER TABLE "associated_notes" ADD CONSTRAINT "associated_notes_note_id_notes_id_fkey" FOREIGN KEY ("note_id") REFERENCES "notes"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "associated_notes" ADD CONSTRAINT "associated_notes_associated_note_id_notes_id_fkey" FOREIGN KEY ("associated_note_id") REFERENCES "notes"("id") ON DELETE CASCADE;