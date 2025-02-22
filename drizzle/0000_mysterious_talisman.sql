CREATE TABLE `character` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`name_ja` text NOT NULL,
	`slug` text NOT NULL,
	`capcom_slug` text,
	`description` text,
	`description_ja` text,
	`tags` text,
	`tags_ja` text,
	`media` text,
	`artwork` text
);
--> statement-breakpoint
CREATE TABLE `combo` (
	`id` text PRIMARY KEY NOT NULL,
	`notes` text,
	`tags` text,
	`media` text,
	`gameVersion` text NOT NULL,
	`opponentCharacterId` integer,
	`modifiers` text,
	`opponentModifiers` text,
	`damage` integer,
	`hitCount` integer,
	`sequence` text NOT NULL,
	`moveSlugs` text NOT NULL,
	`createdAt` text NOT NULL,
	`updatedAt` text NOT NULL,
	`characterId` integer NOT NULL,
	`deviceId` text,
	`shortId` text NOT NULL,
	FOREIGN KEY (`characterId`) REFERENCES `character`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `combo_shortId_unique` ON `combo` (`shortId`);--> statement-breakpoint
CREATE INDEX `character_id_idx` ON `combo` (`characterId`);--> statement-breakpoint
CREATE INDEX `device_id_idx` ON `combo` (`deviceId`);--> statement-breakpoint
CREATE UNIQUE INDEX `device_short_id_idx` ON `combo` (`shortId`,`deviceId`);--> statement-breakpoint
CREATE TABLE `list` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`comboIds` text NOT NULL,
	`deviceId` text,
	`characterId` integer,
	`createdAt` text,
	`updatedAt` text,
	FOREIGN KEY (`characterId`) REFERENCES `character`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `move` (
	`slug` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`name_ja` text NOT NULL,
	`alternativeNames` text,
	`alternativeNames_ja` text,
	`description` text,
	`description_ja` text,
	`abbreviation` text,
	`abbreviation_ja` text,
	`type` text NOT NULL,
	`damage` integer,
	`hitCount` integer,
	`blockType` text,
	`level` text,
	`input` text NOT NULL,
	`cancel` text,
	`cancelsInto` text,
	`frameAdvantage` text,
	`properties` text,
	`notes` text,
	`notes_ja` text,
	`characterId` integer,
	`parents` text,
	`relatedMoves` text,
	`startup` integer,
	`active` text,
	`recovery` integer,
	`postLandingRecovery` integer,
	`superArt` integer,
	`totalFrames` integer,
	`scaling` text,
	`scaling_ja` text,
	`driveGauge` text,
	`capcomID` integer,
	FOREIGN KEY (`characterId`) REFERENCES `character`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `move_character_idx` ON `move` (`characterId`);--> statement-breakpoint
CREATE INDEX `move_slug_idx` ON `move` (`slug`);