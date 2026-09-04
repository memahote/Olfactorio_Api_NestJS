CREATE TABLE "note_impressions" (
	"note_id" uuid,
	"impression_id" uuid,
	CONSTRAINT "note_impressions_pkey" PRIMARY KEY("note_id","impression_id")
);
--> statement-breakpoint
ALTER TABLE "note_impressions" ADD CONSTRAINT "note_impressions_note_id_notes_id_fkey" FOREIGN KEY ("note_id") REFERENCES "notes"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "note_impressions" ADD CONSTRAINT "note_impressions_impression_id_impressions_id_fkey" FOREIGN KEY ("impression_id") REFERENCES "impressions"("id") ON DELETE CASCADE;