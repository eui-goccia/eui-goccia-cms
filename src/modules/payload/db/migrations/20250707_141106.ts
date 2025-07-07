import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`authors\` ADD \`image_id\` text(36) REFERENCES images(id);`)
  await db.run(sql`CREATE INDEX \`authors_image_idx\` ON \`authors\` (\`image_id\`);`)
  await db.run(sql`ALTER TABLE \`authors_locales\` ADD \`partner\` text;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_authors\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`slug\` text,
  	\`slug_lock\` integer DEFAULT true,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`INSERT INTO \`__new_authors\`("id", "name", "slug", "slug_lock", "updated_at", "created_at") SELECT "id", "name", "slug", "slug_lock", "updated_at", "created_at" FROM \`authors\`;`)
  await db.run(sql`DROP TABLE \`authors\`;`)
  await db.run(sql`ALTER TABLE \`__new_authors\` RENAME TO \`authors\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`authors_slug_idx\` ON \`authors\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`authors_updated_at_idx\` ON \`authors\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`authors_created_at_idx\` ON \`authors\` (\`created_at\`);`)
  await db.run(sql`ALTER TABLE \`authors_locales\` DROP COLUMN \`partner\`;`)
}
