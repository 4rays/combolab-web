# combolab-web

## Initial Setup

To install dependencies:

```bash
bun install
```

To generate types:

```bash
bun run typegen
```

## Development

To run:

```bash
bun run dev
```

The app uses Postgres for the database. For local development, PGLite is used instead.

To create the database:

```bash
bun run db:create:dev
```

To drop the local database:

```bash
bun run db:teardown:dev
```

To generate migrations:

```bash
bun run db:migrations:create:dev
```

To apply migrations:

```bash
bun run db:migrations:apply:dev #or
bun run db:migrations:apply:prod
```

To view the database via Drizzle Studio:

```bash
bun run db:view:dev #or
bun run db:view:prod
```
