import type {Config} from "drizzle-kit";

export default {
  dialect: "postgresql",
  driver: "pglite",
  schema: "./drizzle/schema.ts",
  out: "./drizzle/migrations/dev",
  dbCredentials: {
    url: "./drizzle/pgdata",
  },
} satisfies Config;
