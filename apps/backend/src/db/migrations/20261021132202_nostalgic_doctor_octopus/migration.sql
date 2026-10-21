CREATE TABLE `music` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`title` text NOT NULL,
	`artist` text NOT NULL,
	`album` text,
	`genre` text,
	`duration` integer NOT NULL,
	`audio_url` text NOT NULL,
	`cover_url` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
