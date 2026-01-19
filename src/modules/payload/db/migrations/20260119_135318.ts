import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`posts_blocks_video\` DROP COLUMN \`vertical\`;`)
  await db.run(sql`ALTER TABLE \`_posts_v_blocks_video\` DROP COLUMN \`vertical\`;`)
  await db.run(sql`ALTER TABLE \`progetto_blocks_video\` DROP COLUMN \`vertical\`;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`posts_blocks_video\` ADD \`vertical\` text DEFAULT 'center';`)
  await db.run(sql`ALTER TABLE \`_posts_v_blocks_video\` ADD \`vertical\` text DEFAULT 'center';`)
  await db.run(sql`ALTER TABLE \`progetto_blocks_video\` ADD \`vertical\` text DEFAULT 'center';`)
}
