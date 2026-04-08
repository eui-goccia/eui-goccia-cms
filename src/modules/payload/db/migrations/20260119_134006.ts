import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`posts_blocks_video\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`url\` text,
  	\`light\` integer DEFAULT true,
  	\`aspect_ratio\` text DEFAULT '16/9',
  	\`width\` text DEFAULT 'full',
  	\`vertical\` text DEFAULT 'center',
  	\`horizontal\` text DEFAULT 'center',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_blocks_video_order_idx\` ON \`posts_blocks_video\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_video_parent_id_idx\` ON \`posts_blocks_video\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_blocks_video_path_idx\` ON \`posts_blocks_video\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`posts_blocks_video_locales\` (
  	\`title\` text,
  	\`caption\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts_blocks_video\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_blocks_video_locales_locale_parent_id_unique\` ON \`posts_blocks_video_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_video\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`url\` text,
  	\`light\` integer DEFAULT true,
  	\`aspect_ratio\` text DEFAULT '16/9',
  	\`width\` text DEFAULT 'full',
  	\`vertical\` text DEFAULT 'center',
  	\`horizontal\` text DEFAULT 'center',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_video_order_idx\` ON \`_posts_v_blocks_video\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_video_parent_id_idx\` ON \`_posts_v_blocks_video\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_blocks_video_path_idx\` ON \`_posts_v_blocks_video\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_blocks_video_locales\` (
  	\`title\` text,
  	\`caption\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v_blocks_video\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_posts_v_blocks_video_locales_locale_parent_id_unique\` ON \`_posts_v_blocks_video_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`progetto_blocks_video\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`url\` text NOT NULL,
  	\`light\` integer DEFAULT true,
  	\`aspect_ratio\` text DEFAULT '16/9',
  	\`width\` text DEFAULT 'full',
  	\`vertical\` text DEFAULT 'center',
  	\`horizontal\` text DEFAULT 'center',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`progetto\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`progetto_blocks_video_order_idx\` ON \`progetto_blocks_video\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`progetto_blocks_video_parent_id_idx\` ON \`progetto_blocks_video\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`progetto_blocks_video_path_idx\` ON \`progetto_blocks_video\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`progetto_blocks_video_locales\` (
  	\`title\` text,
  	\`caption\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`progetto_blocks_video\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`progetto_blocks_video_locales_locale_parent_id_unique\` ON \`progetto_blocks_video_locales\` (\`_locale\`,\`_parent_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`posts_blocks_video\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_video_locales\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_video\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_video_locales\`;`)
  await db.run(sql`DROP TABLE \`progetto_blocks_video\`;`)
  await db.run(sql`DROP TABLE \`progetto_blocks_video_locales\`;`)
}
