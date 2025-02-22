import React from "react";

interface RestaurantMenuPageProps {
  params: Promise<{ slug: string }>;
}

export default async function RestaurantMenuPage({
  params,
}: RestaurantMenuPageProps) {
  const { slug } = await params;
  return <div>RestaurantMenuPage {slug}</div>;
}
