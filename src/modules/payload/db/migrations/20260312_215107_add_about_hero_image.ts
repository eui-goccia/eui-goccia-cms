import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`about\` ADD \`hero_image_id\` text(36) REFERENCES images(id);`)
  await db.run(sql`CREATE INDEX \`about_hero_image_idx\` ON \`about\` (\`hero_image_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_about\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`INSERT INTO \`__new_about\`("id", "updated_at", "created_at") SELECT "id", "updated_at", "created_at" FROM \`about\`;`)
  await db.run(sql`DROP TABLE \`about\`;`)
  await db.run(sql`ALTER TABLE \`__new_about\` RENAME TO \`about\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
}
