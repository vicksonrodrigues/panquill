import { getUser } from "@/features/users/db/users";
import { auth } from "@clerk/nextjs/server";

export async function getCurrentUser({ allData = false } = {}) {
  const { userId } = await auth();

  return {
    userId,
    user: allData && userId != null ? await getUser(userId) : undefined,
  };
}
