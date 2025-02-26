import {
  pgTable,
  text,
  integer,
  jsonb,
  index,
  uniqueIndex,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";

export const game = pgTable("game", {
  id: text("id").notNull().primaryKey(),
  name: text("name").notNull(),
  nameJa: text("name_ja").notNull(),
  slug: text("slug").notNull(),
  gameflintId: text("gameflint_id"),
});

export const character = pgTable(
  "character",
  {
    id: integer("id").notNull().primaryKey(),
    name: text("name").notNull(),
    nameJa: text("name_ja").notNull(),
    slug: text("slug").notNull(),
    media: jsonb("media"),
    artwork: text("artwork"),
    gameId: text("game_id").references(() => game.id),
  },
  (character) => [index("character_game_idx").on(character.gameId)],
);

export const move = pgTable(
  "move",
  {
    slug: text("slug").notNull().primaryKey(),
    name: text("name").notNull(),
    nameJa: text("name_ja").notNull(),
    input: text("input").notNull(),
    characterId: integer("character_id").references(() => character.id),
  },
  (move) => [
    index("move_character_idx").on(move.characterId),
    index("move_slug_idx").on(move.slug),
  ],
);

export const combo = pgTable(
  "combo",
  {
    id: text("id").notNull().primaryKey(),
    notes: text("notes"),
    gameVersion: text("gameVersion").notNull(),
    damage: integer("damage"),
    hitCount: integer("hitCount"),
    sequence: text("sequence").notNull(),
    moveSlugs: text("moveSlugs"),
    createdAt: text("createdAt").notNull(),
    updatedAt: text("updatedAt").notNull(),
    characterId: integer("characterId")
      .notNull()
      .references(() => character.id),
    shortId: text("shortId").unique().notNull(),
    userId: text("userId").references(() => user.id),
  },
  (combo) => [
    index("character_id_idx").on(combo.characterId),
    uniqueIndex("short_id_idx").on(combo.shortId),
    index("user_id_idx").on(combo.userId),
  ],
);

export const list = pgTable(
  "list",
  {
    id: text("id").notNull().primaryKey(),
    name: text("name").notNull(),
    description: text("description"),
    comboIds: text("comboIds").notNull(),
    characterId: integer("characterId").references(() => character.id),
    createdAt: text("createdAt"),
    updatedAt: text("updatedAt"),
    userId: text("userId").references(() => user.id),
  },
  (list) => [
    index("character_id_idx").on(list.characterId),
    index("user_id_idx").on(list.userId),
  ],
);

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, {onDelete: "cascade"}),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, {onDelete: "cascade"}),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});
