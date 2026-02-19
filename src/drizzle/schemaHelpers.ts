import { timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const id = () => uuid().primaryKey().defaultRandom();

export const timestamps = {
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),

  updatedAt: timestamp({ withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
};

export const normalizedName = () => varchar().notNull().unique();
