import { db } from "@/drizzle/db";
import { users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { cacheTag } from "next/cache";
import { getUserIdTag, revalidateUserCache } from "./cache/users";

export type UserTable = typeof users.$inferInsert;

export async function insertUser(user: UserTable) {
  const userDetails = await db
    .insert(users)
    .values(user)
    .returning()
    .onConflictDoNothing();

  console.log("User Details", userDetails);
  revalidateUserCache(user.id);
}

export async function updateUser(id: string, user: Partial<UserTable>) {
  const userDetails = await db
    .update(users)
    .set(user)
    .where(eq(users.id, id))
    .returning();

  console.log("Updated User Details", userDetails);
  revalidateUserCache(id);
}

export async function deleteUser(id: string) {
  await db.delete(users).where(eq(users.id, id));
}

export async function getUser(id: string) {
  "use cache";
  cacheTag(getUserIdTag(id));

  const userData = await db.query.users.findFirst({
    where: eq(users.id, id),
  });
  return userData;
}
