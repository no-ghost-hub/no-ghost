import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`
 CREATE TABLE IF NOT EXISTS "pages_blocks_image_block" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"image_id" integer,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_video_block" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"video_src" varchar,
	"video_poster_id" integer,
	"video_ratio_x" numeric,
	"video_ratio_y" numeric,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_image_block" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"image_id" integer,
	"_uuid" varchar,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_video_block" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"video_src" varchar,
	"video_poster_id" integer,
	"video_ratio_x" numeric,
	"video_ratio_y" numeric,
	"_uuid" varchar,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "quotes_blocks_image_block" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"image_id" integer,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "quotes_blocks_video_block" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"video_src" varchar NOT NULL,
	"video_poster_id" integer,
	"video_ratio_x" numeric NOT NULL,
	"video_ratio_y" numeric NOT NULL,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "site_blocks_image_block" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"image_id" integer,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "site_blocks_video_block" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"video_src" varchar NOT NULL,
	"video_poster_id" integer,
	"video_ratio_x" numeric NOT NULL,
	"video_ratio_y" numeric NOT NULL,
	"block_name" varchar
);

ALTER TABLE "pages_blocks_content_block" DROP CONSTRAINT "pages_blocks_content_block_medium_medium_id_media_id_fk";

ALTER TABLE "_pages_v_blocks_content_block" DROP CONSTRAINT "_pages_v_blocks_content_block_medium_medium_id_media_id_fk";

ALTER TABLE "quotes" DROP CONSTRAINT "quotes_medium_medium_id_media_id_fk";

ALTER TABLE "site" DROP CONSTRAINT "site_medium_medium_id_media_id_fk";

CREATE INDEX IF NOT EXISTS "pages_blocks_image_block_order_idx" ON "pages_blocks_image_block" ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_image_block_parent_id_idx" ON "pages_blocks_image_block" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_image_block_path_idx" ON "pages_blocks_image_block" ("_path");
CREATE INDEX IF NOT EXISTS "pages_blocks_video_block_order_idx" ON "pages_blocks_video_block" ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_video_block_parent_id_idx" ON "pages_blocks_video_block" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_video_block_path_idx" ON "pages_blocks_video_block" ("_path");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_image_block_order_idx" ON "_pages_v_blocks_image_block" ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_image_block_parent_id_idx" ON "_pages_v_blocks_image_block" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_image_block_path_idx" ON "_pages_v_blocks_image_block" ("_path");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_video_block_order_idx" ON "_pages_v_blocks_video_block" ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_video_block_parent_id_idx" ON "_pages_v_blocks_video_block" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_video_block_path_idx" ON "_pages_v_blocks_video_block" ("_path");
CREATE INDEX IF NOT EXISTS "quotes_blocks_image_block_order_idx" ON "quotes_blocks_image_block" ("_order");
CREATE INDEX IF NOT EXISTS "quotes_blocks_image_block_parent_id_idx" ON "quotes_blocks_image_block" ("_parent_id");
CREATE INDEX IF NOT EXISTS "quotes_blocks_image_block_path_idx" ON "quotes_blocks_image_block" ("_path");
CREATE INDEX IF NOT EXISTS "quotes_blocks_video_block_order_idx" ON "quotes_blocks_video_block" ("_order");
CREATE INDEX IF NOT EXISTS "quotes_blocks_video_block_parent_id_idx" ON "quotes_blocks_video_block" ("_parent_id");
CREATE INDEX IF NOT EXISTS "quotes_blocks_video_block_path_idx" ON "quotes_blocks_video_block" ("_path");
CREATE INDEX IF NOT EXISTS "site_blocks_image_block_order_idx" ON "site_blocks_image_block" ("_order");
CREATE INDEX IF NOT EXISTS "site_blocks_image_block_parent_id_idx" ON "site_blocks_image_block" ("_parent_id");
CREATE INDEX IF NOT EXISTS "site_blocks_image_block_path_idx" ON "site_blocks_image_block" ("_path");
CREATE INDEX IF NOT EXISTS "site_blocks_video_block_order_idx" ON "site_blocks_video_block" ("_order");
CREATE INDEX IF NOT EXISTS "site_blocks_video_block_parent_id_idx" ON "site_blocks_video_block" ("_parent_id");
CREATE INDEX IF NOT EXISTS "site_blocks_video_block_path_idx" ON "site_blocks_video_block" ("_path");
ALTER TABLE "pages_blocks_content_block" DROP COLUMN IF EXISTS "medium_medium_id";
ALTER TABLE "_pages_v_blocks_content_block" DROP COLUMN IF EXISTS "medium_medium_id";
ALTER TABLE "quotes" DROP COLUMN IF EXISTS "medium_medium_id";
ALTER TABLE "site" DROP COLUMN IF EXISTS "medium_medium_id";
DO $$ BEGIN
 ALTER TABLE "pages_blocks_image_block" ADD CONSTRAINT "pages_blocks_image_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_blocks_image_block" ADD CONSTRAINT "pages_blocks_image_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_blocks_video_block" ADD CONSTRAINT "pages_blocks_video_block_video_poster_id_media_id_fk" FOREIGN KEY ("video_poster_id") REFERENCES "media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_blocks_video_block" ADD CONSTRAINT "pages_blocks_video_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_pages_v_blocks_image_block" ADD CONSTRAINT "_pages_v_blocks_image_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_pages_v_blocks_image_block" ADD CONSTRAINT "_pages_v_blocks_image_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_pages_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_pages_v_blocks_video_block" ADD CONSTRAINT "_pages_v_blocks_video_block_video_poster_id_media_id_fk" FOREIGN KEY ("video_poster_id") REFERENCES "media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_pages_v_blocks_video_block" ADD CONSTRAINT "_pages_v_blocks_video_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_pages_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "quotes_blocks_image_block" ADD CONSTRAINT "quotes_blocks_image_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "quotes_blocks_image_block" ADD CONSTRAINT "quotes_blocks_image_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "quotes"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "quotes_blocks_video_block" ADD CONSTRAINT "quotes_blocks_video_block_video_poster_id_media_id_fk" FOREIGN KEY ("video_poster_id") REFERENCES "media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "quotes_blocks_video_block" ADD CONSTRAINT "quotes_blocks_video_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "quotes"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "site_blocks_image_block" ADD CONSTRAINT "site_blocks_image_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "site_blocks_image_block" ADD CONSTRAINT "site_blocks_image_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "site"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "site_blocks_video_block" ADD CONSTRAINT "site_blocks_video_block_video_poster_id_media_id_fk" FOREIGN KEY ("video_poster_id") REFERENCES "media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "site_blocks_video_block" ADD CONSTRAINT "site_blocks_video_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "site"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`
 DROP TABLE "pages_blocks_image_block";
DROP TABLE "pages_blocks_video_block";
DROP TABLE "_pages_v_blocks_image_block";
DROP TABLE "_pages_v_blocks_video_block";
DROP TABLE "quotes_blocks_image_block";
DROP TABLE "quotes_blocks_video_block";
DROP TABLE "site_blocks_image_block";
DROP TABLE "site_blocks_video_block";
ALTER TABLE "pages_blocks_content_block" ADD COLUMN "medium_medium_id" integer;
ALTER TABLE "_pages_v_blocks_content_block" ADD COLUMN "medium_medium_id" integer;
ALTER TABLE "quotes" ADD COLUMN "medium_medium_id" integer;
ALTER TABLE "site" ADD COLUMN "medium_medium_id" integer;
DO $$ BEGIN
 ALTER TABLE "pages_blocks_content_block" ADD CONSTRAINT "pages_blocks_content_block_medium_medium_id_media_id_fk" FOREIGN KEY ("medium_medium_id") REFERENCES "media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_pages_v_blocks_content_block" ADD CONSTRAINT "_pages_v_blocks_content_block_medium_medium_id_media_id_fk" FOREIGN KEY ("medium_medium_id") REFERENCES "media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "quotes" ADD CONSTRAINT "quotes_medium_medium_id_media_id_fk" FOREIGN KEY ("medium_medium_id") REFERENCES "media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "site" ADD CONSTRAINT "site_medium_medium_id_media_id_fk" FOREIGN KEY ("medium_medium_id") REFERENCES "media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`)
}
