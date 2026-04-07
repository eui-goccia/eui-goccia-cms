import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`events\` ADD \`show_program\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`events_locales\` ADD \`description\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v\` ADD \`version_show_program\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`_events_v_locales\` ADD \`version_description\` text;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`events\` DROP COLUMN \`show_program\`;`)
  await db.run(sql`ALTER TABLE \`events_locales\` DROP COLUMN \`description\`;`)
  await db.run(sql`ALTER TABLE \`_events_v\` DROP COLUMN \`version_show_program\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_locales\` DROP COLUMN \`version_description\`;`)
}
