import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`audio\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`prefix\` text DEFAULT 'audio',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric
  );
  `)
  await db.run(sql`CREATE INDEX \`audio_updated_at_idx\` ON \`audio\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`audio_created_at_idx\` ON \`audio\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`audio_filename_idx\` ON \`audio\` (\`filename\`);`)
  await db.run(sql`CREATE TABLE \`audio_locales\` (
  	\`title\` text,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`audio\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`audio_locales_locale_parent_id_unique\` ON \`audio_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_audio\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`source_type\` text DEFAULT 'url',
  	\`url\` text,
  	\`audio_file_id\` text(36),
  	\`width\` text DEFAULT 'full',
  	\`horizontal\` text DEFAULT 'center',
  	\`block_name\` text,
  	FOREIGN KEY (\`audio_file_id\`) REFERENCES \`audio\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_audio_order_idx\` ON \`posts_blocks_audio\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_audio_parent_id_idx\` ON \`posts_blocks_audio\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_audio_path_idx\` ON \`posts_blocks_audio\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_audio_audio_file_idx\` ON \`posts_blocks_audio\` (\`audio_file_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_audio_locales\` (
  	\`title\` text,
  	\`caption\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_audio\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_blocks_audio_locales_locale_parent_id_unique\` ON \`posts_blocks_audio_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_audio\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`source_type\` text DEFAULT 'url',
  	\`url\` text,
  	\`audio_file_id\` text(36),
  	\`width\` text DEFAULT 'full',
  	\`horizontal\` text DEFAULT 'center',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`audio_file_id\`) REFERENCES \`audio\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_audio_order_idx\` ON \`_posts_v_blocks_audio\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_audio_parent_id_idx\` ON \`_posts_v_blocks_audio\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_audio_path_idx\` ON \`_posts_v_blocks_audio\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_audio_audio_file_idx\` ON \`_posts_v_blocks_audio\` (\`audio_file_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_audio_locales\` (
  	\`title\` text,
  	\`caption\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v_blocks_audio\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_posts_v_blocks_audio_locales_locale_parent_id_unique\` ON \`_posts_v_blocks_audio_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`progetto_blocks_audio\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`source_type\` text DEFAULT 'url',
  	\`url\` text,
  	\`audio_file_id\` text(36),
  	\`width\` text DEFAULT 'full',
  	\`horizontal\` text DEFAULT 'center',
  	\`block_name\` text,
  	FOREIGN KEY (\`audio_file_id\`) REFERENCES \`audio\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`progetto\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`progetto_blocks_audio_order_idx\` ON \`progetto_blocks_audio\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`progetto_blocks_audio_parent_id_idx\` ON \`progetto_blocks_audio\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`progetto_blocks_audio_path_idx\` ON \`progetto_blocks_audio\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`progetto_blocks_audio_audio_file_idx\` ON \`progetto_blocks_audio\` (\`audio_file_id\`);`)
  await db.run(sql`CREATE TABLE \`progetto_blocks_audio_locales\` (
  	\`title\` text,
  	\`caption\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`progetto_blocks_audio\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`progetto_blocks_audio_locales_locale_parent_id_unique\` ON \`progetto_blocks_audio_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`audio_id\` text(36) REFERENCES audio(id);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_audio_id_idx\` ON \`payload_locked_documents_rels\` (\`audio_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`audio\`;`)
  await db.run(sql`DROP TABLE \`audio_locales\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_audio\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_audio_locales\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_audio\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_audio_locales\`;`)
  await db.run(sql`DROP TABLE \`progetto_blocks_audio\`;`)
  await db.run(sql`DROP TABLE \`progetto_blocks_audio_locales\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`images_id\` text(36),
  	\`users_id\` text(36),
  	\`posts_id\` text(36),
  	\`authors_id\` text(36),
  	\`tags_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`images_id\`) REFERENCES \`images\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`authors_id\`) REFERENCES \`authors\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tags_id\`) REFERENCES \`tags\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "images_id", "users_id", "posts_id", "authors_id", "tags_id") SELECT "id", "order", "parent_id", "path", "images_id", "users_id", "posts_id", "authors_id", "tags_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_images_id_idx\` ON \`payload_locked_documents_rels\` (\`images_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_posts_id_idx\` ON \`payload_locked_documents_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_authors_id_idx\` ON \`payload_locked_documents_rels\` (\`authors_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_tags_id_idx\` ON \`payload_locked_documents_rels\` (\`tags_id\`);`)
}
