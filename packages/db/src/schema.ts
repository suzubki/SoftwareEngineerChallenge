import { sql } from "drizzle-orm";
import { pgTable } from "drizzle-orm/pg-core";

export const Post = pgTable("post", (t) => ({
  id: t.uuid().notNull().primaryKey().defaultRandom(),
  title: t.varchar({ length: 256 }).notNull(),
  content: t.text().notNull(),
  createdAt: t.timestamp().defaultNow().notNull(),
  updatedAt: t
    .timestamp({ mode: "date", withTimezone: true })
    .$onUpdateFn(() => sql`now()`),
}));

export const Setup = pgTable("setup", (t) => ({
  id: t.uuid().notNull().primaryKey().defaultRandom(),
  title: t.varchar({ length: 256 }).notNull(),
  author: t.varchar({ length: 256 }).notNull(),
  imageUrl: t.text().notNull(),
  description: t.text(),
  likes: t.integer().notNull(),
  tags: t.text().array().default([]),
}));

export interface EntityMap {
  Post: typeof Post.$inferSelect;
  Setup: typeof Setup.$inferSelect;
}
export type Entity = keyof EntityMap;
export type Model<TEntity extends Entity> = EntityMap[TEntity];

export * from "./auth-schema";
