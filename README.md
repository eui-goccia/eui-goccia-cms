# La Goccia

- Nextjs 16
- PayloadCMS 3
- Tailwind 4
- shadcn/ui
- Turso
- R2

## Local Data Safety

Local app execution, migrations, builds, tests, and uploads must target local
SQLite and local MinIO.

- `DATABASE_URL` is the primary runtime database URL. Use
	`DATABASE_URL=file:payload.sqlite` for local dev, builds, and tests.
- `TURSO_DATABASE_URL` is the production/source database URL. It is read by
	`scripts/pull-prod.sh`, and deployed runtime may use it only when
	`DATABASE_URL` is not set.
- `R2_*` credentials are source-only media credentials for
	`scripts/sync-media.sh`; Payload runtime must use `S3_*` instead.
- `S3_*` config is the runtime upload target. Local uploads must use
	`S3_ENDPOINT=http://localhost:9000`.

Fresh local dataset workflow:

```bash
pnpm db:up
pnpm pull:prod
pnpm build
```

Full local verification:

```bash
pnpm db:up
pnpm pull:prod
pnpm payload migrate
pnpm test
pnpm typecheck
pnpm exec biome check .
pnpm build
```
