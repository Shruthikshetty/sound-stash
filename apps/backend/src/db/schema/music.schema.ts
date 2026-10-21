import type { z } from "zod";

import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

// create the music table
export const music = sqliteTable("music", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  artist: text("artist").notNull(),
  album: text("album"),
  genre: text("genre"),
  duration: integer("duration").notNull(), // duration in seconds
  audioUrl: text("audio_url").notNull(),
  coverUrl: text("cover_url"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date()),
});

// create schema for insert operation
export const addMusicSchema = createInsertSchema(music, {
  title: (field) => field.min(1).max(500),
  artist: (field) => field.min(1).max(500),
  audioUrl: (field) => field.url(),
  coverUrl: (field) => field.url(),
})
  .required({
    title: true,
    artist: true,
    audioUrl: true,
    duration: true,
  })
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  });

// music schema for select
export const selectMusicSchema = createSelectSchema(music);

// export types
export type MusicType = z.infer<typeof selectMusicSchema>;
export type AddMusicType = z.infer<typeof addMusicSchema>;
