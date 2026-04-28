import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`DROP INDEX \`events_breadcrumbs_locale_idx\`;`)
  await db.run(sql`ALTER TABLE \`events_breadcrumbs\` DROP COLUMN \`_locale\`;`)
  await db.run(sql`DROP INDEX \`_events_v_version_breadcrumbs_locale_idx\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_version_breadcrumbs\` DROP COLUMN \`_locale\`;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`events_breadcrumbs\` ADD \`_locale\` text NOT NULL;`)
  await db.run(sql`CREATE INDEX \`events_breadcrumbs_locale_idx\` ON \`events_breadcrumbs\` (\`_locale\`);`)
  await db.run(sql`ALTER TABLE \`_events_v_version_breadcrumbs\` ADD \`_locale\` text NOT NULL;`)
  await db.run(sql`CREATE INDEX \`_events_v_version_breadcrumbs_locale_idx\` ON \`_events_v_version_breadcrumbs\` (\`_locale\`);`)
}
