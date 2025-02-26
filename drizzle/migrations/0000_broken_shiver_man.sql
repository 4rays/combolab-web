CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "character" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"name_ja" text NOT NULL,
	"slug" text NOT NULL,
	"media" jsonb,
	"artwork" text,
	"game_id" text
);
--> statement-breakpoint
CREATE TABLE "combo" (
	"id" text PRIMARY KEY NOT NULL,
	"notes" text,
	"gameVersion" text NOT NULL,
	"damage" integer,
	"hitCount" integer,
	"sequence" text NOT NULL,
	"moveSlugs" text,
	"createdAt" text NOT NULL,
	"updatedAt" text NOT NULL,
	"characterId" integer NOT NULL,
	"shortId" text NOT NULL,
	"userId" text,
	CONSTRAINT "combo_shortId_unique" UNIQUE("shortId")
);
--> statement-breakpoint
CREATE TABLE "game" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"name_ja" text NOT NULL,
	"slug" text NOT NULL,
	"gameflint_id" text
);
--> statement-breakpoint
CREATE TABLE "list" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"comboIds" text NOT NULL,
	"characterId" integer,
	"createdAt" text,
	"updatedAt" text,
	"userId" text
);
--> statement-breakpoint
CREATE TABLE "move" (
	"slug" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"name_ja" text NOT NULL,
	"input" text NOT NULL,
	"character_id" integer
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean NOT NULL,
	"image" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "character" ADD CONSTRAINT "character_game_id_game_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."game"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "combo" ADD CONSTRAINT "combo_characterId_character_id_fk" FOREIGN KEY ("characterId") REFERENCES "public"."character"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "combo" ADD CONSTRAINT "combo_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "list" ADD CONSTRAINT "list_characterId_character_id_fk" FOREIGN KEY ("characterId") REFERENCES "public"."character"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "list" ADD CONSTRAINT "list_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "move" ADD CONSTRAINT "move_character_id_character_id_fk" FOREIGN KEY ("character_id") REFERENCES "public"."character"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "character_game_idx" ON "character" USING btree ("game_id");--> statement-breakpoint
CREATE INDEX "combo_character_id_idx" ON "combo" USING btree ("characterId");--> statement-breakpoint
CREATE UNIQUE INDEX "combo_short_id_idx" ON "combo" USING btree ("shortId");--> statement-breakpoint
CREATE INDEX "combo_user_id_idx" ON "combo" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "list_character_id_idx" ON "list" USING btree ("characterId");--> statement-breakpoint
CREATE INDEX "list_user_id_idx" ON "list" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "move_character_idx" ON "move" USING btree ("character_id");--> statement-breakpoint
CREATE INDEX "move_slug_idx" ON "move" USING btree ("slug");