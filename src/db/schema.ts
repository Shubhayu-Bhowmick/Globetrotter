import { pgTable, serial, text, integer, timestamp, json } from "drizzle-orm/pg-core"

export const destinations = pgTable("destinations", {
  id: serial("id").primaryKey(),
  city: text("city").notNull(),
  country: text("country").notNull(),
  clues: json("clues").$type<string[]>().notNull(),
  fun_fact: json("fun_fact").$type<string[]>().notNull(),
  trivia: json("trivia").$type<string[]>().notNull(),
  created_at: timestamp("created_at").defaultNow(),
})

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  score: integer("score").notNull().default(0),
  correct_count: integer("correct_count").notNull().default(0),
  wrong_count: integer("wrong_count").notNull().default(0),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
})

