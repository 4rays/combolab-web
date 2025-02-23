CREATE TABLE "character" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"name_ja" text NOT NULL,
	"slug" text NOT NULL,
	"capcom_slug" text,
	"description" text,
	"description_ja" text,
	"tags" jsonb,
	"tags_ja" jsonb,
	"media" jsonb,
	"artwork" text
);
--> statement-breakpoint
CREATE TABLE "combo" (
	"id" text PRIMARY KEY NOT NULL,
	"notes" text,
	"tags" jsonb,
	"media" jsonb,
	"gameVersion" text NOT NULL,
	"opponentCharacterId" integer,
	"modifiers" text,
	"opponentModifiers" text,
	"damage" integer,
	"hitCount" integer,
	"sequence" text NOT NULL,
	"moveSlugs" text NOT NULL,
	"createdAt" text NOT NULL,
	"updatedAt" text NOT NULL,
	"characterId" integer NOT NULL,
	"deviceId" text,
	"shortId" text NOT NULL,
	CONSTRAINT "combo_shortId_unique" UNIQUE("shortId")
);
--> statement-breakpoint
CREATE TABLE "list" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"comboIds" text NOT NULL,
	"deviceId" text,
	"characterId" integer,
	"createdAt" text,
	"updatedAt" text
);
--> statement-breakpoint
CREATE TABLE "move" (
	"slug" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"name_ja" text NOT NULL,
	"alternativeNames" jsonb,
	"alternativeNames_ja" jsonb,
	"description" text,
	"description_ja" text,
	"abbreviation" text,
	"abbreviation_ja" text,
	"type" text NOT NULL,
	"damage" integer,
	"hitCount" integer,
	"blockType" text,
	"level" text,
	"input" text NOT NULL,
	"cancel" text,
	"cancelsInto" jsonb,
	"frameAdvantage" text,
	"properties" jsonb,
	"notes" jsonb,
	"notes_ja" jsonb,
	"characterId" integer,
	"parents" jsonb,
	"relatedMoves" jsonb,
	"startup" integer,
	"active" text,
	"recovery" integer,
	"postLandingRecovery" integer,
	"superArt" integer,
	"totalFrames" integer,
	"scaling" text,
	"scaling_ja" text,
	"driveGauge" text,
	"capcomID" integer
);
--> statement-breakpoint
ALTER TABLE "combo" ADD CONSTRAINT "combo_characterId_character_id_fk" FOREIGN KEY ("characterId") REFERENCES "public"."character"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "list" ADD CONSTRAINT "list_characterId_character_id_fk" FOREIGN KEY ("characterId") REFERENCES "public"."character"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "move" ADD CONSTRAINT "move_characterId_character_id_fk" FOREIGN KEY ("characterId") REFERENCES "public"."character"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "character_id_idx" ON "combo" USING btree ("characterId");--> statement-breakpoint
CREATE INDEX "device_id_idx" ON "combo" USING btree ("deviceId");--> statement-breakpoint
CREATE UNIQUE INDEX "device_short_id_idx" ON "combo" USING btree ("shortId","deviceId");--> statement-breakpoint
CREATE INDEX "move_character_idx" ON "move" USING btree ("characterId");--> statement-breakpoint
CREATE INDEX "move_slug_idx" ON "move" USING btree ("slug");