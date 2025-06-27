import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "about_partners" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"bio" varchar NOT NULL,
  	"logo_id" uuid NOT NULL,
  	"members" varchar
  );
  
  CREATE TABLE "about" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"description" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "goccia_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"cover_id" uuid NOT NULL,
  	"start" numeric NOT NULL,
  	"end" numeric
  );
  
  CREATE TABLE "goccia" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"description" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "about_partners" ADD CONSTRAINT "about_partners_logo_id_images_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_partners" ADD CONSTRAINT "about_partners_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "goccia_timeline" ADD CONSTRAINT "goccia_timeline_cover_id_images_id_fk" FOREIGN KEY ("cover_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "goccia_timeline" ADD CONSTRAINT "goccia_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."goccia"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "about_partners_order_idx" ON "about_partners" USING btree ("_order");
  CREATE INDEX "about_partners_parent_id_idx" ON "about_partners" USING btree ("_parent_id");
  CREATE INDEX "about_partners_logo_idx" ON "about_partners" USING btree ("logo_id");
  CREATE INDEX "goccia_timeline_order_idx" ON "goccia_timeline" USING btree ("_order");
  CREATE INDEX "goccia_timeline_parent_id_idx" ON "goccia_timeline" USING btree ("_parent_id");
  CREATE INDEX "goccia_timeline_cover_idx" ON "goccia_timeline" USING btree ("cover_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "about_partners" CASCADE;
  DROP TABLE "about" CASCADE;
  DROP TABLE "goccia_timeline" CASCADE;
  DROP TABLE "goccia" CASCADE;`)
}
