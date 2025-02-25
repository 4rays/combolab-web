import {
  pgTable,
  text,
  integer,
  jsonb,
  index,
  uniqueIndex,
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
    // TODO: add userId
  },
  (combo) => [
    index("character_id_idx").on(combo.characterId),
    uniqueIndex("short_id_idx").on(combo.shortId),
  ],
);

export const list = pgTable("list", {
  id: text("id").notNull().primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  comboIds: text("comboIds").notNull(),
  characterId: integer("characterId").references(() => character.id),
  createdAt: text("createdAt"),
  updatedAt: text("updatedAt"),
  // TODO: add userId
});
