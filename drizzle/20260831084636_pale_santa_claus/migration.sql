CREATE TABLE "impressions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"description" text NOT NULL UNIQUE
);
