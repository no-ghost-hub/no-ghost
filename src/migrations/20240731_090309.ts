import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`
 ALTER TABLE "pages_blocks_text_block" ADD COLUMN "text_h_t_m_l" varchar;
ALTER TABLE "_pages_v_blocks_text_block" ADD COLUMN "text_h_t_m_l" varchar;`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`
 ALTER TABLE "pages_blocks_text_block" DROP COLUMN IF EXISTS "text_h_t_m_l";
ALTER TABLE "_pages_v_blocks_text_block" DROP COLUMN IF EXISTS "text_h_t_m_l";`)
}
