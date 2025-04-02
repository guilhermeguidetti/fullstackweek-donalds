import { db } from "@/lib/prisma";

export async function getRestaurants() {
  const restaurants = await db.restaurant.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      avatarImageUrl: true,
      coverImageUrl: true,
    },
  });

  return restaurants;
}
