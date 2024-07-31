import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`
 DROP TABLE "site_blocks_image_block";
DROP TABLE "site_blocks_video_block";
ALTER TABLE "media" ADD COLUMN "caption_h_t_m_l" varchar;
ALTER TABLE "site" ADD COLUMN "image_id" integer;
DO $$ BEGIN
 ALTER TABLE "site" ADD CONSTRAINT "site_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "site" DROP COLUMN IF EXISTS "medium_caption";
ALTER TABLE "site" DROP COLUMN IF EXISTS "medium_caption_h_t_m_l";`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`
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

ALTER TABLE "site" DROP CONSTRAINT "site_image_id_media_id_fk";

ALTER TABLE "site" ADD COLUMN "medium_caption" jsonb;
ALTER TABLE "site" ADD COLUMN "medium_caption_h_t_m_l" varchar;
CREATE INDEX IF NOT EXISTS "site_blocks_image_block_order_idx" ON "site_blocks_image_block" ("_order");
CREATE INDEX IF NOT EXISTS "site_blocks_image_block_parent_id_idx" ON "site_blocks_image_block" ("_parent_id");
CREATE INDEX IF NOT EXISTS "site_blocks_image_block_path_idx" ON "site_blocks_image_block" ("_path");
CREATE INDEX IF NOT EXISTS "site_blocks_video_block_order_idx" ON "site_blocks_video_block" ("_order");
CREATE INDEX IF NOT EXISTS "site_blocks_video_block_parent_id_idx" ON "site_blocks_video_block" ("_parent_id");
CREATE INDEX IF NOT EXISTS "site_blocks_video_block_path_idx" ON "site_blocks_video_block" ("_path");
ALTER TABLE "media" DROP COLUMN IF EXISTS "caption_h_t_m_l";
ALTER TABLE "site" DROP COLUMN IF EXISTS "image_id";
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
