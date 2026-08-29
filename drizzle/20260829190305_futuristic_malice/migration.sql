CREATE TABLE "files" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"bucket" varchar(255) NOT NULL,
	"key" varchar(255) NOT NULL,
	"file_name" varchar(255) NOT NULL,
	"mime_type" varchar(255) NOT NULL,
	"size" numeric NOT NULL
);
--> statement-breakpoint
ALTER TABLE "olfactive_families" RENAME COLUMN "image_url" TO "file_id";--> statement-breakpoint
ALTER TABLE "olfactive_families" ALTER COLUMN "file_id" SET DATA TYPE uuid USING "file_id"::uuid;--> statement-breakpoint
ALTER TABLE "olfactive_families" ADD CONSTRAINT "olfactive_families_file_id_files_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id");