import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`events\` ADD \`label\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v\` ADD \`version_label\` text;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`events\` DROP COLUMN \`label\`;`)
  await db.run(sql`ALTER TABLE \`_events_v\` DROP COLUMN \`version_label\`;`)
}
