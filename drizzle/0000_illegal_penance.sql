CREATE TABLE `event` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`start_time` integer NOT NULL,
	`end_time` integer NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`deleted_at` integer,
	`is_recurring` integer
);
--> statement-breakpoint
CREATE TABLE `recurring_pattern` (
	`event_id` integer PRIMARY KEY NOT NULL,
	`separation_count` integer NOT NULL,
	`max_num_of_occurrences` integer,
	`day_of_week` integer,
	`week_of_month` integer,
	`day_of_month` integer,
	`month_of_year` integer,
	`recurring_type_id` integer,
	FOREIGN KEY (`event_id`) REFERENCES `event`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`recurring_type_id`) REFERENCES `recurring_type`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `recurring_type` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`type` text NOT NULL
);
