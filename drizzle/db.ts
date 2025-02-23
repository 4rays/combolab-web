import * as schema from "./schema";
import {drizzle as drizzleNeon} from "drizzle-orm/neon-http";
import {drizzle as drizzlePglite} from "drizzle-orm/pglite";
import {neon} from "@neondatabase/serverless";

let databaseUrl = import.meta.env.DATABASE_URL;
let db;

if (databaseUrl.includes("localhost")) {
  db = drizzlePglite("./drizzle/pgdata");
} else {
  const sql = neon(databaseUrl);
  db = drizzleNeon({client: sql, schema});
}

export {db};
