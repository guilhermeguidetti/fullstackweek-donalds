import Image from "next/image";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { getRestaurants } from "./actions";

export default async function Home() {
  const restaurants = await getRestaurants();

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-center text-3xl font-bold">Restaurantes</h1>
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:max-w-none lg:grid-cols-3">
        {restaurants.map((restaurant) => (
          <Link key={restaurant.id} href={`/${restaurant.slug}`}>
            <Card className="h-full transition-colors hover:bg-accent">
              <CardHeader className="p-0">
                <div className="relative h-40 w-full sm:h-48">
                  <Image
                    src={restaurant.coverImageUrl}
                    alt={restaurant.name}
                    fill
                    className="rounded-t-lg object-cover"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full sm:h-16 sm:w-16">
                    <Image
                      src={restaurant.avatarImageUrl}
                      alt={restaurant.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <CardTitle className="text-base sm:text-lg">
                      {restaurant.name}
                    </CardTitle>
                    <p className="mt-1 line-clamp-2 text-xs text-muted-foreground sm:text-sm">
                      {restaurant.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
