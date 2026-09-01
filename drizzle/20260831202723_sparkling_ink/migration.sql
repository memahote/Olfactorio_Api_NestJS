CREATE TABLE "atmospheres" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" varchar(100) NOT NULL,
	"owner_id" uuid,
	"file_id" uuid NOT NULL,
	CONSTRAINT "atmospheres_user_id_name_unique" UNIQUE("owner_id","name")
);
--> statement-breakpoint
ALTER TABLE "atmospheres" ADD CONSTRAINT "atmospheres_owner_id_users_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id");--> statement-breakpoint
ALTER TABLE "atmospheres" ADD CONSTRAINT "atmospheres_file_id_files_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id");