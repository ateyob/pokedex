import prisma from "@/lib/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getFavourites() {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.favoriteIds === null) {
    return null;
  }
  return currentUser.favoriteIds;
}
