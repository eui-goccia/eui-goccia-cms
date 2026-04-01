import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`events_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`url\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`events_links_order_idx\` ON \`events_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`events_links_parent_id_idx\` ON \`events_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`events_links_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events_links\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`events_links_locales_locale_parent_id_unique\` ON \`events_links_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_version_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`url\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_events_v_version_links_order_idx\` ON \`_events_v_version_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_version_links_parent_id_idx\` ON \`_events_v_version_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_version_links_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v_version_links\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_events_v_version_links_locales_locale_parent_id_unique\` ON \`_events_v_version_links_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`ALTER TABLE \`events\` ADD \`organizer\` text;`)
  await db.run(sql`ALTER TABLE \`events\` ADD \`booking_url\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v\` ADD \`version_organizer\` text;`)
  await db.run(sql`ALTER TABLE \`_events_v\` ADD \`version_booking_url\` text;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`events_links\`;`)
  await db.run(sql`DROP TABLE \`events_links_locales\`;`)
  await db.run(sql`DROP TABLE \`_events_v_version_links\`;`)
  await db.run(sql`DROP TABLE \`_events_v_version_links_locales\`;`)
  await db.run(sql`ALTER TABLE \`events\` DROP COLUMN \`organizer\`;`)
  await db.run(sql`ALTER TABLE \`events\` DROP COLUMN \`booking_url\`;`)
  await db.run(sql`ALTER TABLE \`_events_v\` DROP COLUMN \`version_organizer\`;`)
  await db.run(sql`ALTER TABLE \`_events_v\` DROP COLUMN \`version_booking_url\`;`)
}
