import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "about_partners" ALTER COLUMN "logo_id" DROP NOT NULL;
  ALTER TABLE "about" ALTER COLUMN "description" SET DEFAULT 'La Cordata di progetto è guidata dal Comune di Milano e composta da Ambiente Italia Srl, Climateflux GmbH, Eutropian Association, FROM, Open Impact, Osservatorio La Goccia, Politecnico di Milano.';
  ALTER TABLE "goccia" ALTER COLUMN "description" SET DEFAULT 'Nata come area industriale tra fine Ottocento e inizio Novecento, poi dismessa e abbandonata tra gli anni ‘70 e ‘90, la Goccia è oggi è al centro di progetti di rigenerazione che intrecciano memoria industriale, ambiente e futuro urbano.';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "about_partners" ALTER COLUMN "logo_id" SET NOT NULL;
  ALTER TABLE "about" ALTER COLUMN "description" DROP DEFAULT;
  ALTER TABLE "goccia" ALTER COLUMN "description" DROP DEFAULT;`)
}
