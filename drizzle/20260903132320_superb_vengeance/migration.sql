CREATE TABLE "explored_notes" (
	"user_id" uuid NOT NULL,
	"note_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "favorite_notes" (
	"user_id" uuid NOT NULL,
	"note_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "explored_notes" ADD CONSTRAINT "explored_notes_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "explored_notes" ADD CONSTRAINT "explored_notes_note_id_olfactive_families_id_fkey" FOREIGN KEY ("note_id") REFERENCES "olfactive_families"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "favorite_notes" ADD CONSTRAINT "favorite_notes_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "favorite_notes" ADD CONSTRAINT "favorite_notes_note_id_olfactive_families_id_fkey" FOREIGN KEY ("note_id") REFERENCES "olfactive_families"("id") ON DELETE CASCADE;