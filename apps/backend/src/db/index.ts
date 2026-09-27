import { defineRelations } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema/index";

const relations = defineRelations(schema);

// c.env.DB does not exist when the file loads
// hence we cant export db directly so we are exporting a function to return the db
export function createDB(d1: D1Database) {
  return drizzle(d1, {
    relations,
  });
}

export type AppDB = ReturnType<typeof createDB>;
