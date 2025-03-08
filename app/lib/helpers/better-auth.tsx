import {betterAuth} from "better-auth";
import {drizzleAdapter} from "better-auth/adapters/drizzle";
import {db} from "@drizzle/db";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  // Uncomment below lines to enable social providers
  // socialProviders: {
  // google: {
  //   clientId: process.env.GOOGLE_CLIENT_ID!,
  //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  // },
  // discord: {
  //   clientId: process.env.DISCORD_CLIENT_ID!,
  //   clientSecret: process.env.DISCORD_CLIENT_SECRET!,
  // },
  // },
  // Uncomment below line to enable Redis for caching sessions and ratelimiting
  // secondaryStorage: redisSecondaryStorage
});
