CREATE TABLE "family_attribute" (
	"family_id" uuid,
	"attribute_id" uuid,
	CONSTRAINT "family_attribute_pkey" PRIMARY KEY("family_id","attribute_id")
);
--> statement-breakpoint
ALTER TABLE "family_attribute" ADD CONSTRAINT "family_attribute_family_id_olfactive_families_id_fkey" FOREIGN KEY ("family_id") REFERENCES "olfactive_families"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "family_attribute" ADD CONSTRAINT "family_attribute_attribute_id_attributes_id_fkey" FOREIGN KEY ("attribute_id") REFERENCES "attributes"("id") ON DELETE CASCADE;