CREATE TABLE "olfactive_families" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" varchar(100) NOT NULL UNIQUE,
	"description" text NOT NULL,
	"image_url" text NOT NULL,
	"primary_color" varchar(7) NOT NULL,
	"secondary_color" varchar(7) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
