import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Column renames (start_date → when_start_date, etc.) are skipped because
  // Payload's push mode already applied them to the local DB.
  // If running against a fresh DB, the first migration already uses the new names.
  await db.run(sql`ALTER TABLE \`events_locales\` ADD \`meta_title\` text;`)
  await db.run(sql`ALTER TABLE \`events_locales\` ADD \`meta_image_id\` text(36) REFERENCES images(id);`)
  await db.run(sql`ALTER TABLE \`events_locales\` ADD \`meta_description\` text;`)
  await db.run(sql`CREATE INDEX \`events_meta_meta_image_idx\` ON \`events_locales\` (\`meta_image_id\`,\`_locale\`);`)
  await db.run(sql`ALTER TABLE \`events_locales\` DROP COLUMN \`content_description\`;`)
  await db.run(sql`ALTER TABLE \`_events_v_locales\` ADD \`version_meta_title\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v_locales\` ADD \`version_meta_image_id\` text(36) REFERENCES images(id);`)
  await db.run(sql`ALTER TABLE \`_events_v_locales\` ADD \`version_meta_description\` text;`)
  await db.run(sql`CREATE INDEX \`_events_v_version_meta_version_meta_image_idx\` ON \`_events_v_locales\` (\`version_meta_image_id\`,\`_locale\`);`)
  await db.run(sql`ALTER TABLE \`_events_v_locales\` DROP COLUMN \`version_content_description\`;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`events\` RENAME COLUMN "when_start_date" TO "start_date";`)
  await db.run(sql`ALTER TABLE \`events\` RENAME COLUMN "when_end_date" TO "end_date";`)
  await db.run(sql`ALTER TABLE \`_events_v\` RENAME COLUMN "version_when_start_date" TO "version_start_date";`)
  await db.run(sql`ALTER TABLE \`_events_v\` RENAME COLUMN "version_when_end_date" TO "version_end_date";`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_events_locales\` (
  	\`title\` text,
  	\`content_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_events_locales\`("title", "content_description", "id", "_locale", "_parent_id") SELECT "title", "content_description", "id", "_locale", "_parent_id" FROM \`events_locales\`;`)
  await db.run(sql`DROP TABLE \`events_locales\`;`)
  await db.run(sql`ALTER TABLE \`__new_events_locales\` RENAME TO \`events_locales\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE UNIQUE INDEX \`events_locales_locale_parent_id_unique\` ON \`events_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__events_v_locales\` (
  	\`version_title\` text,
  	\`version_content_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__events_v_locales\`("version_title", "version_content_description", "id", "_locale", "_parent_id") SELECT "version_title", "version_content_description", "id", "_locale", "_parent_id" FROM \`_events_v_locales\`;`)
  await db.run(sql`DROP TABLE \`_events_v_locales\`;`)
  await db.run(sql`ALTER TABLE \`__new__events_v_locales\` RENAME TO \`_events_v_locales\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_events_v_locales_locale_parent_id_unique\` ON \`_events_v_locales\` (\`_locale\`,\`_parent_id\`);`)
}
