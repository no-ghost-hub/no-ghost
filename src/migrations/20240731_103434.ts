import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`
 ALTER TABLE "pages_blocks_content_block" ADD COLUMN "medium_caption_h_t_m_l" varchar;
ALTER TABLE "_pages_v_blocks_content_block" ADD COLUMN "medium_caption_h_t_m_l" varchar;
ALTER TABLE "quotes" ADD COLUMN "medium_caption_h_t_m_l" varchar;
ALTER TABLE "site" ADD COLUMN "medium_caption_h_t_m_l" varchar;`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`
 ALTER TABLE "pages_blocks_content_block" DROP COLUMN IF EXISTS "medium_caption_h_t_m_l";
ALTER TABLE "_pages_v_blocks_content_block" DROP COLUMN IF EXISTS "medium_caption_h_t_m_l";
ALTER TABLE "quotes" DROP COLUMN IF EXISTS "medium_caption_h_t_m_l";
ALTER TABLE "site" DROP COLUMN IF EXISTS "medium_caption_h_t_m_l";`)
}
