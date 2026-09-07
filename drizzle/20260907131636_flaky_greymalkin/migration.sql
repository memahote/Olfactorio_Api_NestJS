CREATE TYPE "comparisonEnum" AS ENUM('NOTE', 'VARIATION');--> statement-breakpoint
CREATE TABLE "comparison_notes" (
	"comparison_id" uuid NOT NULL,
	"note_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "comparison" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"comparison_type" "comparisonEnum" NOT NULL,
	"user_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "comparison_notes" ADD CONSTRAINT "comparison_notes_comparison_id_comparison_id_fkey" FOREIGN KEY ("comparison_id") REFERENCES "comparison"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "comparison_notes" ADD CONSTRAINT "comparison_notes_note_id_notes_id_fkey" FOREIGN KEY ("note_id") REFERENCES "notes"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "comparison" ADD CONSTRAINT "comparison_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;