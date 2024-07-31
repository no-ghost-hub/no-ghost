import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`
 DO $$ BEGIN
 CREATE TYPE "enum_pages_blocks_text_block_theme" AS ENUM('default');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_pages_blocks_quotes_block_theme" AS ENUM('default');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_pages_blocks_footer_block_theme" AS ENUM('default');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_pages_blocks_content_block_theme" AS ENUM('default', 'full');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_pages_status" AS ENUM('draft', 'published');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__pages_v_blocks_text_block_theme" AS ENUM('default');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__pages_v_blocks_quotes_block_theme" AS ENUM('default');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__pages_v_blocks_footer_block_theme" AS ENUM('default');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__pages_v_blocks_content_block_theme" AS ENUM('default', 'full');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__pages_v_version_status" AS ENUM('draft', 'published');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_menus_items_link_type" AS ENUM('reference', 'custom');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"email" varchar NOT NULL,
	"reset_password_token" varchar,
	"reset_password_expiration" timestamp(3) with time zone,
	"salt" varchar,
	"hash" varchar,
	"login_attempts" numeric,
	"lock_until" timestamp(3) with time zone
);

CREATE TABLE IF NOT EXISTS "pages_blocks_text_block" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"text" jsonb,
	"theme" "enum_pages_blocks_text_block_theme",
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_quotes_block" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"theme" "enum_pages_blocks_quotes_block_theme",
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_footer_block" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"theme" "enum_pages_blocks_footer_block_theme",
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_content_block" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"medium_medium_id" integer,
	"medium_caption" jsonb,
	"theme" "enum_pages_blocks_content_block_theme",
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "pages" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar,
	"slug" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"_status" "enum_pages_status"
);

CREATE TABLE IF NOT EXISTS "pages_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"quotes_id" integer
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_text_block" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"text" jsonb,
	"theme" "enum__pages_v_blocks_text_block_theme",
	"_uuid" varchar,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_quotes_block" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"theme" "enum__pages_v_blocks_quotes_block_theme",
	"_uuid" varchar,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_footer_block" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"theme" "enum__pages_v_blocks_footer_block_theme",
	"_uuid" varchar,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_content_block" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"medium_medium_id" integer,
	"medium_caption" jsonb,
	"theme" "enum__pages_v_blocks_content_block_theme",
	"_uuid" varchar,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v" (
	"id" serial PRIMARY KEY NOT NULL,
	"parent_id" integer,
	"version_title" varchar,
	"version_slug" varchar,
	"version_updated_at" timestamp(3) with time zone,
	"version_created_at" timestamp(3) with time zone,
	"version__status" "enum__pages_v_version_status",
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"latest" boolean,
	"autosave" boolean
);

CREATE TABLE IF NOT EXISTS "_pages_v_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"quotes_id" integer
);

CREATE TABLE IF NOT EXISTS "media" (
	"id" serial PRIMARY KEY NOT NULL,
	"alt" varchar NOT NULL,
	"caption" jsonb,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"url" varchar,
	"thumbnail_u_r_l" varchar,
	"filename" varchar,
	"mime_type" varchar,
	"filesize" numeric,
	"width" numeric,
	"height" numeric,
	"focal_x" numeric,
	"focal_y" numeric
);

CREATE TABLE IF NOT EXISTS "quotes" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"slug" varchar NOT NULL,
	"role" varchar NOT NULL,
	"age" numeric NOT NULL,
	"quote" varchar NOT NULL,
	"medium_medium_id" integer,
	"medium_caption" jsonb,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "menus_items" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"link_type" "enum_menus_items_link_type",
	"link_url" varchar,
	"link_icon" varchar,
	"link_text" varchar
);

CREATE TABLE IF NOT EXISTS "menus" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"slug" varchar NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "menus_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"pages_id" integer
);

CREATE TABLE IF NOT EXISTS "payload_preferences" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" varchar,
	"value" jsonb,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "payload_preferences_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"users_id" integer
);

CREATE TABLE IF NOT EXISTS "payload_migrations" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"batch" numeric,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "site" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"description" varchar,
	"medium_medium_id" integer,
	"medium_caption" jsonb,
	"updated_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone
);

CREATE TABLE IF NOT EXISTS "site_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"pages_id" integer
);

CREATE TABLE IF NOT EXISTS "footer" (
	"id" serial PRIMARY KEY NOT NULL,
	"updated_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone
);

CREATE TABLE IF NOT EXISTS "footer_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"menus_id" integer
);

CREATE INDEX IF NOT EXISTS "users_created_at_idx" ON "users" ("created_at");
CREATE UNIQUE INDEX IF NOT EXISTS "users_email_idx" ON "users" ("email");
CREATE INDEX IF NOT EXISTS "pages_blocks_text_block_order_idx" ON "pages_blocks_text_block" ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_text_block_parent_id_idx" ON "pages_blocks_text_block" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_text_block_path_idx" ON "pages_blocks_text_block" ("_path");
CREATE INDEX IF NOT EXISTS "pages_blocks_quotes_block_order_idx" ON "pages_blocks_quotes_block" ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_quotes_block_parent_id_idx" ON "pages_blocks_quotes_block" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_quotes_block_path_idx" ON "pages_blocks_quotes_block" ("_path");
CREATE INDEX IF NOT EXISTS "pages_blocks_footer_block_order_idx" ON "pages_blocks_footer_block" ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_footer_block_parent_id_idx" ON "pages_blocks_footer_block" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_footer_block_path_idx" ON "pages_blocks_footer_block" ("_path");
CREATE INDEX IF NOT EXISTS "pages_blocks_content_block_order_idx" ON "pages_blocks_content_block" ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_content_block_parent_id_idx" ON "pages_blocks_content_block" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_content_block_path_idx" ON "pages_blocks_content_block" ("_path");
CREATE INDEX IF NOT EXISTS "pages_created_at_idx" ON "pages" ("created_at");
CREATE INDEX IF NOT EXISTS "pages__status_idx" ON "pages" ("_status");
CREATE INDEX IF NOT EXISTS "pages_rels_order_idx" ON "pages_rels" ("order");
CREATE INDEX IF NOT EXISTS "pages_rels_parent_idx" ON "pages_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "pages_rels_path_idx" ON "pages_rels" ("path");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_text_block_order_idx" ON "_pages_v_blocks_text_block" ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_text_block_parent_id_idx" ON "_pages_v_blocks_text_block" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_text_block_path_idx" ON "_pages_v_blocks_text_block" ("_path");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_quotes_block_order_idx" ON "_pages_v_blocks_quotes_block" ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_quotes_block_parent_id_idx" ON "_pages_v_blocks_quotes_block" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_quotes_block_path_idx" ON "_pages_v_blocks_quotes_block" ("_path");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_footer_block_order_idx" ON "_pages_v_blocks_footer_block" ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_footer_block_parent_id_idx" ON "_pages_v_blocks_footer_block" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_footer_block_path_idx" ON "_pages_v_blocks_footer_block" ("_path");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_content_block_order_idx" ON "_pages_v_blocks_content_block" ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_content_block_parent_id_idx" ON "_pages_v_blocks_content_block" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_content_block_path_idx" ON "_pages_v_blocks_content_block" ("_path");
CREATE INDEX IF NOT EXISTS "_pages_v_version_version_created_at_idx" ON "_pages_v" ("version_created_at");
CREATE INDEX IF NOT EXISTS "_pages_v_version_version__status_idx" ON "_pages_v" ("version__status");
CREATE INDEX IF NOT EXISTS "_pages_v_created_at_idx" ON "_pages_v" ("created_at");
CREATE INDEX IF NOT EXISTS "_pages_v_updated_at_idx" ON "_pages_v" ("updated_at");
CREATE INDEX IF NOT EXISTS "_pages_v_latest_idx" ON "_pages_v" ("latest");
CREATE INDEX IF NOT EXISTS "_pages_v_autosave_idx" ON "_pages_v" ("autosave");
CREATE INDEX IF NOT EXISTS "_pages_v_rels_order_idx" ON "_pages_v_rels" ("order");
CREATE INDEX IF NOT EXISTS "_pages_v_rels_parent_idx" ON "_pages_v_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_rels_path_idx" ON "_pages_v_rels" ("path");
CREATE INDEX IF NOT EXISTS "media_created_at_idx" ON "media" ("created_at");
CREATE UNIQUE INDEX IF NOT EXISTS "media_filename_idx" ON "media" ("filename");
CREATE INDEX IF NOT EXISTS "quotes_created_at_idx" ON "quotes" ("created_at");
CREATE INDEX IF NOT EXISTS "menus_items_order_idx" ON "menus_items" ("_order");
CREATE INDEX IF NOT EXISTS "menus_items_parent_id_idx" ON "menus_items" ("_parent_id");
CREATE INDEX IF NOT EXISTS "menus_created_at_idx" ON "menus" ("created_at");
CREATE INDEX IF NOT EXISTS "menus_rels_order_idx" ON "menus_rels" ("order");
CREATE INDEX IF NOT EXISTS "menus_rels_parent_idx" ON "menus_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "menus_rels_path_idx" ON "menus_rels" ("path");
CREATE INDEX IF NOT EXISTS "payload_preferences_key_idx" ON "payload_preferences" ("key");
CREATE INDEX IF NOT EXISTS "payload_preferences_created_at_idx" ON "payload_preferences" ("created_at");
CREATE INDEX IF NOT EXISTS "payload_preferences_rels_order_idx" ON "payload_preferences_rels" ("order");
CREATE INDEX IF NOT EXISTS "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "payload_preferences_rels_path_idx" ON "payload_preferences_rels" ("path");
CREATE INDEX IF NOT EXISTS "payload_migrations_created_at_idx" ON "payload_migrations" ("created_at");
CREATE INDEX IF NOT EXISTS "site_rels_order_idx" ON "site_rels" ("order");
CREATE INDEX IF NOT EXISTS "site_rels_parent_idx" ON "site_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "site_rels_path_idx" ON "site_rels" ("path");
CREATE INDEX IF NOT EXISTS "footer_rels_order_idx" ON "footer_rels" ("order");
CREATE INDEX IF NOT EXISTS "footer_rels_parent_idx" ON "footer_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "footer_rels_path_idx" ON "footer_rels" ("path");
DO $$ BEGIN
 ALTER TABLE "pages_blocks_text_block" ADD CONSTRAINT "pages_blocks_text_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_blocks_quotes_block" ADD CONSTRAINT "pages_blocks_quotes_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_blocks_footer_block" ADD CONSTRAINT "pages_blocks_footer_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_blocks_content_block" ADD CONSTRAINT "pages_blocks_content_block_medium_medium_id_media_id_fk" FOREIGN KEY ("medium_medium_id") REFERENCES "media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_blocks_content_block" ADD CONSTRAINT "pages_blocks_content_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_quotes_fk" FOREIGN KEY ("quotes_id") REFERENCES "quotes"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_pages_v_blocks_text_block" ADD CONSTRAINT "_pages_v_blocks_text_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_pages_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_pages_v_blocks_quotes_block" ADD CONSTRAINT "_pages_v_blocks_quotes_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_pages_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_pages_v_blocks_footer_block" ADD CONSTRAINT "_pages_v_blocks_footer_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_pages_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_pages_v_blocks_content_block" ADD CONSTRAINT "_pages_v_blocks_content_block_medium_medium_id_media_id_fk" FOREIGN KEY ("medium_medium_id") REFERENCES "media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_pages_v_blocks_content_block" ADD CONSTRAINT "_pages_v_blocks_content_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_pages_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "pages"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "_pages_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_quotes_fk" FOREIGN KEY ("quotes_id") REFERENCES "quotes"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "quotes" ADD CONSTRAINT "quotes_medium_medium_id_media_id_fk" FOREIGN KEY ("medium_medium_id") REFERENCES "media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "menus_items" ADD CONSTRAINT "menus_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "menus"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "menus_rels" ADD CONSTRAINT "menus_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "menus"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "menus_rels" ADD CONSTRAINT "menus_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "site" ADD CONSTRAINT "site_medium_medium_id_media_id_fk" FOREIGN KEY ("medium_medium_id") REFERENCES "media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "site_rels" ADD CONSTRAINT "site_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "site"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "site_rels" ADD CONSTRAINT "site_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "footer"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_menus_fk" FOREIGN KEY ("menus_id") REFERENCES "menus"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`
 DROP TABLE "users";
DROP TABLE "pages_blocks_text_block";
DROP TABLE "pages_blocks_quotes_block";
DROP TABLE "pages_blocks_footer_block";
DROP TABLE "pages_blocks_content_block";
DROP TABLE "pages";
DROP TABLE "pages_rels";
DROP TABLE "_pages_v_blocks_text_block";
DROP TABLE "_pages_v_blocks_quotes_block";
DROP TABLE "_pages_v_blocks_footer_block";
DROP TABLE "_pages_v_blocks_content_block";
DROP TABLE "_pages_v";
DROP TABLE "_pages_v_rels";
DROP TABLE "media";
DROP TABLE "quotes";
DROP TABLE "menus_items";
DROP TABLE "menus";
DROP TABLE "menus_rels";
DROP TABLE "payload_preferences";
DROP TABLE "payload_preferences_rels";
DROP TABLE "payload_migrations";
DROP TABLE "site";
DROP TABLE "site_rels";
DROP TABLE "footer";
DROP TABLE "footer_rels";`)
}
