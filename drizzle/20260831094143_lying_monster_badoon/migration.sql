CREATE TABLE "feelings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" varchar(100) NOT NULL,
	"user_id" uuid NOT NULL,
	CONSTRAINT "feelings_user_id_name_unique" UNIQUE("user_id","name")
);
--> statement-breakpoint
ALTER TABLE "family_attribute" DROP CONSTRAINT "family_attribute_pkey";--> statement-breakpoint
ALTER TABLE "feelings" ADD CONSTRAINT "feelings_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;