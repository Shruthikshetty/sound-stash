import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// create the user table
export const users = sqliteTable("users", {
  id: integer("id").primaryKey(),
  name: text("name"),
  email: text("email").notNull().unique(),
  role: text("role", { enum: ["user", "admin"] })
    .default("user")
    .notNull(),
  avatar: text("avatar"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date()),
  googleId: text("google_id").notNull().unique(),
});

// create schema for insert operation
export const addUserSchema = createInsertSchema(users, {
  email: (field) => field.min(1).max(1000),
  name: (field) => field.min(1).max(1000),
})
  .required({
    email: true,
    name: true,
    googleId: true,
  })
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    role: true,
  });

// user schema for select
export const selectUserSchema = createSelectSchema(users);
// export type
export type UserType = z.infer<typeof selectUserSchema>;
