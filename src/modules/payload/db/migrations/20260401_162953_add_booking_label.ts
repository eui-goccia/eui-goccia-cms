import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`events_locales\` ADD \`booking_label\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_locales\` ADD \`version_booking_label\` text;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`events_locales\` DROP COLUMN \`booking_label\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_locales\` DROP COLUMN \`version_booking_label\`;`)
}
