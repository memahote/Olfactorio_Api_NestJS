CREATE TABLE "explored_families" (
	"user_id" uuid NOT NULL,
	"family_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "explored_families" ADD CONSTRAINT "explored_families_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "explored_families" ADD CONSTRAINT "explored_families_family_id_olfactive_families_id_fkey" FOREIGN KEY ("family_id") REFERENCES "olfactive_families"("id") ON DELETE CASCADE;