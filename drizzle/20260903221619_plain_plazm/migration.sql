ALTER TABLE "explored_families" ADD PRIMARY KEY ("user_id","family_id");--> statement-breakpoint
ALTER TABLE "explored_notes" ADD PRIMARY KEY ("user_id","note_id");--> statement-breakpoint
ALTER TABLE "family_attribute" ADD PRIMARY KEY ("family_id","attribute_id");--> statement-breakpoint
ALTER TABLE "favorite_notes" ADD PRIMARY KEY ("user_id","note_id");