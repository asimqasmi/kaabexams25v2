CREATE TABLE `students` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`student_number` text NOT NULL,
	`grade` integer NOT NULL,
	`section` integer NOT NULL,
	`created_at` integer,
	`updated_at` integer
);
