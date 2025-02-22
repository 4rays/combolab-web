import {
  sqliteTable,
  text,
  int,
  index,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

export const character = sqliteTable("character", {
  id: int("id").notNull().primaryKey(),
  name: text("name").notNull(),
  nameJa: text("name_ja").notNull(),
  slug: text("slug").notNull(),
  capcom_slug: text("capcom_slug"),
  description: text("description"),
  descriptionJa: text("description_ja"),
  tags: text("tags", { mode: "json" }).$type<string[]>(),
  tagsJa: text("tags_ja", { mode: "json" }).$type<string[]>(),
  media: text("media", { mode: "json" }).$type<string[]>(),
  artwork: text("artwork").$type<string>(),
});

export const move = sqliteTable(
  "move",
  {
    slug: text("slug").notNull().primaryKey(),
    name: text("name").notNull(),
    nameJa: text("name_ja").notNull(),
    alternativeNames: text("alternativeNames", { mode: "json" }).$type<
      string[]
    >(),
    alternativeNamesJa: text("alternativeNames_ja", { mode: "json" }).$type<
      string[]
    >(),
    description: text("description"),
    descriptionJa: text("description_ja"),
    abbreviation: text("abbreviation"),
    abbreviationJa: text("abbreviation_ja"),
    type: text("type").notNull(),
    damage: int("damage"),
    hitCount: int("hitCount"),
    blockType: text("blockType"),
    level: text("level"),
    input: text("input").notNull(),
    cancel: text("cancel"),
    cancelsInto: text("cancelsInto", { mode: "json" }).$type<string[]>(),
    frameAdvantage: text("frameAdvantage"),
    properties: text("properties", { mode: "json" }).$type<string[]>(),
    notes: text("notes", { mode: "json" }).$type<string[]>(),
    notesJa: text("notes_ja", { mode: "json" }).$type<string[]>(),
    characterId: int("characterId").references(() => character.id),
    parents: text("parents", { mode: "json" }).$type<string[]>(),
    relatedMoves: text("relatedMoves", { mode: "json" }).$type<string[]>(),
    startup: int("startup"),
    active: text("active"),
    recovery: int("recovery"),
    postLandingRecovery: int("postLandingRecovery"),
    superArt: int("superArt"),
    totalFrames: int("totalFrames"),
    scaling: text("scaling"),
    scalingJa: text("scaling_ja"),
    driveGauge: text("driveGauge"),
    capcomID: int("capcomID"),
  },
  (move) => {
    return {
      characterIdx: index("move_character_idx").on(move.characterId),
      slugIdx: index("move_slug_idx").on(move.slug),
    };
  },
);

export const combo = sqliteTable(
  "combo",
  {
    id: text("id").notNull().primaryKey(),
    notes: text("notes"),
    tags: text("tags", { mode: "json" }).$type<string[]>(),
    media: text("media", { mode: "json" }).$type<string[]>(),
    gameVersion: text("gameVersion").notNull(),
    opponentCharacterId: int("opponentCharacterId"),
    modifiers: text("modifiers"),
    opponentModifiers: text("opponentModifiers"),
    damage: int("damage"),
    hitCount: int("hitCount"),
    sequence: text("sequence").notNull(),
    moveSlugs: text("moveSlugs").notNull(),
    createdAt: text("createdAt").notNull(),
    updatedAt: text("updatedAt").notNull(),
    characterId: int("characterId")
      .notNull()
      .references(() => character.id),
    deviceId: text("deviceId"),
    shortId: text("shortId").unique().notNull(),
  },
  (combo) => {
    return {
      characterIdx: index("character_id_idx").on(combo.characterId),
      deviceIdx: index("device_id_idx").on(combo.deviceId),
      idDeviceIdIdx: uniqueIndex("device_short_id_idx").on(
        combo.shortId,
        combo.deviceId,
      ),
    };
  },
);

export const list = sqliteTable("list", {
  id: text("id").notNull().primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  comboIds: text("comboIds").notNull(),
  deviceId: text("deviceId"),
  characterId: int("characterId").references(() => character.id),
  createdAt: text("createdAt"),
  updatedAt: text("updatedAt"),
});
