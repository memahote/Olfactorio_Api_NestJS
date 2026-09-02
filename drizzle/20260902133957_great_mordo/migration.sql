CREATE TYPE "note_pyramid_level" AS ENUM('TOP', 'MIDDLE', 'BASE');--> statement-breakpoint
CREATE TABLE "notes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" varchar(100) NOT NULL,
	"olfactive_description" text NOT NULL,
	"educational_description" text NOT NULL,
	"pyramid_level" "note_pyramid_level" NOT NULL,
	"pyramid_description" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"familyId" uuid NOT NULL,
	"fileId" uuid NOT NULL,
	"parent_note_id" uuid,
	CONSTRAINT "notes_name_familyId_unique" UNIQUE("name","familyId")
);
--> statement-breakpoint
ALTER TABLE "notes" ADD CONSTRAINT "notes_familyId_olfactive_families_id_fkey" FOREIGN KEY ("familyId") REFERENCES "olfactive_families"("id");--> statement-breakpoint
ALTER TABLE "notes" ADD CONSTRAINT "notes_fileId_files_id_fkey" FOREIGN KEY ("fileId") REFERENCES "files"("id");--> statement-breakpoint
ALTER TABLE "notes" ADD CONSTRAINT "notes_parent_note_id" FOREIGN KEY ("parent_note_id") REFERENCES "notes"("id");