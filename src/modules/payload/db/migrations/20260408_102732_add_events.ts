import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`events_blocks_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`vertical\` text DEFAULT 'top',
  	\`horizontal\` text DEFAULT 'left',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`events_blocks_text_order_idx\` ON \`events_blocks_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_text_parent_id_idx\` ON \`events_blocks_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_text_path_idx\` ON \`events_blocks_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_text_locales\` (
  	\`content\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events_blocks_text\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`events_blocks_text_locales_locale_parent_id_unique\` ON \`events_blocks_text_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_rich_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`vertical\` text DEFAULT 'top',
  	\`horizontal\` text DEFAULT 'left',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`events_blocks_rich_text_order_idx\` ON \`events_blocks_rich_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_rich_text_parent_id_idx\` ON \`events_blocks_rich_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_rich_text_path_idx\` ON \`events_blocks_rich_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_rich_text_locales\` (
  	\`content\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events_blocks_rich_text\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`events_blocks_rich_text_locales_locale_parent_id_unique\` ON \`events_blocks_rich_text_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_quote\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`vertical\` text DEFAULT 'bottom',
  	\`horizontal\` text DEFAULT 'right',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`events_blocks_quote_order_idx\` ON \`events_blocks_quote\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_quote_parent_id_idx\` ON \`events_blocks_quote\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_quote_path_idx\` ON \`events_blocks_quote\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_quote_locales\` (
  	\`content\` text,
  	\`author\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events_blocks_quote\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`events_blocks_quote_locales_locale_parent_id_unique\` ON \`events_blocks_quote_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_image\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` text(36),
  	\`width\` text DEFAULT 'full',
  	\`vertical\` text DEFAULT 'center',
  	\`horizontal\` text DEFAULT 'center',
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`images\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`events_blocks_image_order_idx\` ON \`events_blocks_image\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_image_parent_id_idx\` ON \`events_blocks_image\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_image_path_idx\` ON \`events_blocks_image\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_image_image_idx\` ON \`events_blocks_image\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_video\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`url\` text,
  	\`light\` integer DEFAULT true,
  	\`aspect_ratio\` text DEFAULT '16/9',
  	\`width\` text DEFAULT 'full',
  	\`horizontal\` text DEFAULT 'center',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`events_blocks_video_order_idx\` ON \`events_blocks_video\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_video_parent_id_idx\` ON \`events_blocks_video\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_video_path_idx\` ON \`events_blocks_video\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_video_locales\` (
  	\`title\` text,
  	\`caption\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events_blocks_video\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`events_blocks_video_locales_locale_parent_id_unique\` ON \`events_blocks_video_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_audio\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`events_blocks_audio_order_idx\` ON \`events_blocks_audio\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_audio_parent_id_idx\` ON \`events_blocks_audio\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_audio_path_idx\` ON \`events_blocks_audio\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_audio_audio_file_idx\` ON \`events_blocks_audio\` (\`audio_file_id\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_audio_locales\` (
  	\`title\` text,
  	\`caption\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events_blocks_audio\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`events_blocks_audio_locales_locale_parent_id_unique\` ON \`events_blocks_audio_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`events_blocks_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`events_blocks_grid_order_idx\` ON \`events_blocks_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_grid_parent_id_idx\` ON \`events_blocks_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`events_blocks_grid_path_idx\` ON \`events_blocks_grid\` (\`_path\`);`)
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
  await db.run(sql`CREATE TABLE \`events_breadcrumbs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`doc_id\` text(36),
  	\`url\` text,
  	\`label\` text,
  	FOREIGN KEY (\`doc_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`events_breadcrumbs_order_idx\` ON \`events_breadcrumbs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`events_breadcrumbs_parent_id_idx\` ON \`events_breadcrumbs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`events_breadcrumbs_locale_idx\` ON \`events_breadcrumbs\` (\`_locale\`);`)
  await db.run(sql`CREATE INDEX \`events_breadcrumbs_doc_idx\` ON \`events_breadcrumbs\` (\`doc_id\`);`)
  await db.run(sql`CREATE TABLE \`events\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`when_start_date\` text,
  	\`when_end_date\` text,
  	\`address_location\` text,
  	\`address_google_maps_url\` text,
  	\`organizer\` text,
  	\`booking_url\` text,
  	\`cover_image_id\` text(36),
  	\`show_program\` integer DEFAULT false,
  	\`parent_id\` text(36),
  	\`label\` text,
  	\`slug\` text,
  	\`slug_lock\` integer DEFAULT true,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`cover_image_id\`) REFERENCES \`images\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`events_cover_image_idx\` ON \`events\` (\`cover_image_id\`);`)
  await db.run(sql`CREATE INDEX \`events_parent_idx\` ON \`events\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`events_slug_idx\` ON \`events\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`events_updated_at_idx\` ON \`events\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`events_created_at_idx\` ON \`events\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`events__status_idx\` ON \`events\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`events_locales\` (
  	\`title\` text,
  	\`description\` text,
  	\`booking_label\` text,
  	\`meta_title\` text,
  	\`meta_image_id\` text(36),
  	\`meta_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`images\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`events_meta_meta_image_idx\` ON \`events_locales\` (\`meta_image_id\`,\`_locale\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`events_locales_locale_parent_id_unique\` ON \`events_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`vertical\` text DEFAULT 'top',
  	\`horizontal\` text DEFAULT 'left',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_text_order_idx\` ON \`_events_v_blocks_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_text_parent_id_idx\` ON \`_events_v_blocks_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_text_path_idx\` ON \`_events_v_blocks_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_text_locales\` (
  	\`content\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v_blocks_text\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_events_v_blocks_text_locales_locale_parent_id_unique\` ON \`_events_v_blocks_text_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_rich_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`vertical\` text DEFAULT 'top',
  	\`horizontal\` text DEFAULT 'left',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_rich_text_order_idx\` ON \`_events_v_blocks_rich_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_rich_text_parent_id_idx\` ON \`_events_v_blocks_rich_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_rich_text_path_idx\` ON \`_events_v_blocks_rich_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_rich_text_locales\` (
  	\`content\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v_blocks_rich_text\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_events_v_blocks_rich_text_locales_locale_parent_id_unique\` ON \`_events_v_blocks_rich_text_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_quote\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`vertical\` text DEFAULT 'bottom',
  	\`horizontal\` text DEFAULT 'right',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_quote_order_idx\` ON \`_events_v_blocks_quote\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_quote_parent_id_idx\` ON \`_events_v_blocks_quote\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_quote_path_idx\` ON \`_events_v_blocks_quote\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_quote_locales\` (
  	\`content\` text,
  	\`author\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v_blocks_quote\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_events_v_blocks_quote_locales_locale_parent_id_unique\` ON \`_events_v_blocks_quote_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_image\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`image_id\` text(36),
  	\`width\` text DEFAULT 'full',
  	\`vertical\` text DEFAULT 'center',
  	\`horizontal\` text DEFAULT 'center',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`images\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_image_order_idx\` ON \`_events_v_blocks_image\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_image_parent_id_idx\` ON \`_events_v_blocks_image\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_image_path_idx\` ON \`_events_v_blocks_image\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_image_image_idx\` ON \`_events_v_blocks_image\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_video\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`url\` text,
  	\`light\` integer DEFAULT true,
  	\`aspect_ratio\` text DEFAULT '16/9',
  	\`width\` text DEFAULT 'full',
  	\`horizontal\` text DEFAULT 'center',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_video_order_idx\` ON \`_events_v_blocks_video\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_video_parent_id_idx\` ON \`_events_v_blocks_video\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_video_path_idx\` ON \`_events_v_blocks_video\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_video_locales\` (
  	\`title\` text,
  	\`caption\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v_blocks_video\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_events_v_blocks_video_locales_locale_parent_id_unique\` ON \`_events_v_blocks_video_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_audio\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_audio_order_idx\` ON \`_events_v_blocks_audio\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_audio_parent_id_idx\` ON \`_events_v_blocks_audio\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_audio_path_idx\` ON \`_events_v_blocks_audio\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_audio_audio_file_idx\` ON \`_events_v_blocks_audio\` (\`audio_file_id\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_audio_locales\` (
  	\`title\` text,
  	\`caption\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v_blocks_audio\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_events_v_blocks_audio_locales_locale_parent_id_unique\` ON \`_events_v_blocks_audio_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_blocks_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_grid_order_idx\` ON \`_events_v_blocks_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_grid_parent_id_idx\` ON \`_events_v_blocks_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_blocks_grid_path_idx\` ON \`_events_v_blocks_grid\` (\`_path\`);`)
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
  await db.run(sql`CREATE TABLE \`_events_v_version_breadcrumbs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`doc_id\` text(36),
  	\`url\` text,
  	\`label\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`doc_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_events_v_version_breadcrumbs_order_idx\` ON \`_events_v_version_breadcrumbs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_version_breadcrumbs_parent_id_idx\` ON \`_events_v_version_breadcrumbs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_version_breadcrumbs_locale_idx\` ON \`_events_v_version_breadcrumbs\` (\`_locale\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_version_breadcrumbs_doc_idx\` ON \`_events_v_version_breadcrumbs\` (\`doc_id\`);`)
  await db.run(sql`CREATE TABLE \`_events_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_when_start_date\` text,
  	\`version_when_end_date\` text,
  	\`version_address_location\` text,
  	\`version_address_google_maps_url\` text,
  	\`version_organizer\` text,
  	\`version_booking_url\` text,
  	\`version_cover_image_id\` text(36),
  	\`version_show_program\` integer DEFAULT false,
  	\`version_parent_id\` text(36),
  	\`version_label\` text,
  	\`version_slug\` text,
  	\`version_slug_lock\` integer DEFAULT true,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_cover_image_id\`) REFERENCES \`images\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_parent_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_events_v_parent_idx\` ON \`_events_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_version_version_cover_image_idx\` ON \`_events_v\` (\`version_cover_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_version_version_parent_idx\` ON \`_events_v\` (\`version_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_version_version_slug_idx\` ON \`_events_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_version_version_updated_at_idx\` ON \`_events_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_version_version_created_at_idx\` ON \`_events_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_version_version__status_idx\` ON \`_events_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_created_at_idx\` ON \`_events_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_updated_at_idx\` ON \`_events_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_snapshot_idx\` ON \`_events_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_published_locale_idx\` ON \`_events_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_events_v_latest_idx\` ON \`_events_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_events_v_locales\` (
  	\`version_title\` text,
  	\`version_description\` text,
  	\`version_booking_label\` text,
  	\`version_meta_title\` text,
  	\`version_meta_image_id\` text(36),
  	\`version_meta_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`version_meta_image_id\`) REFERENCES \`images\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_events_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_events_v_version_meta_version_meta_image_idx\` ON \`_events_v_locales\` (\`version_meta_image_id\`,\`_locale\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`_events_v_locales_locale_parent_id_unique\` ON \`_events_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`events_id\` text(36) REFERENCES events(id);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_events_id_idx\` ON \`payload_locked_documents_rels\` (\`events_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`events_blocks_text_locales\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_rich_text_locales\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_quote_locales\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_video_locales\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_audio_locales\`;`)
  await db.run(sql`DROP TABLE \`events_links_locales\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_text_locales\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_rich_text_locales\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_quote_locales\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_video_locales\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_audio_locales\`;`)
  await db.run(sql`DROP TABLE \`_events_v_version_links_locales\`;`)
  await db.run(sql`DROP TABLE \`_events_v_version_breadcrumbs\`;`)
  await db.run(sql`DROP TABLE \`_events_v_locales\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_text\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_rich_text\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_quote\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_image\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_video\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_audio\`;`)
  await db.run(sql`DROP TABLE \`_events_v_blocks_grid\`;`)
  await db.run(sql`DROP TABLE \`_events_v_version_links\`;`)
  await db.run(sql`DROP TABLE \`_events_v\`;`)
  await db.run(sql`DROP TABLE \`events_breadcrumbs\`;`)
  await db.run(sql`DROP TABLE \`events_locales\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_text\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_rich_text\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_quote\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_image\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_video\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_audio\`;`)
  await db.run(sql`DROP TABLE \`events_blocks_grid\`;`)
  await db.run(sql`DROP TABLE \`events_links\`;`)
  await db.run(sql`DROP TABLE \`events\`;`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`audio_id\` text(36),
  	\`images_id\` text(36),
  	\`users_id\` text(36),
  	\`posts_id\` text(36),
  	\`authors_id\` text(36),
  	\`tags_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`audio_id\`) REFERENCES \`audio\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`images_id\`) REFERENCES \`images\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`authors_id\`) REFERENCES \`authors\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tags_id\`) REFERENCES \`tags\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "audio_id", "images_id", "users_id", "posts_id", "authors_id", "tags_id") SELECT "id", "order", "parent_id", "path", "audio_id", "images_id", "users_id", "posts_id", "authors_id", "tags_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_audio_id_idx\` ON \`payload_locked_documents_rels\` (\`audio_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_images_id_idx\` ON \`payload_locked_documents_rels\` (\`images_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_posts_id_idx\` ON \`payload_locked_documents_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_authors_id_idx\` ON \`payload_locked_documents_rels\` (\`authors_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_tags_id_idx\` ON \`payload_locked_documents_rels\` (\`tags_id\`);`)
}
