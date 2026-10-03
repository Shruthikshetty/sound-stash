CREATE TABLE `users` (
	`id` integer PRIMARY KEY,
	`name` text,
	`email` text NOT NULL UNIQUE,
	`role` text DEFAULT 'user' NOT NULL,
	`avatar` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`google_id` text NOT NULL UNIQUE
);
