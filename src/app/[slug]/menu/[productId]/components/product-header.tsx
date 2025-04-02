"use client";
import { Product } from "@prisma/client";
import { Pick } from "@prisma/client/runtime/library";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

interface ProductHeaderProps {
  product: Pick<Product, "imageUrl" | "name">;
}

export default function ProductHeader({ product }: ProductHeaderProps) {
  const router = useRouter();
  const { slug } = useParams<{ slug: string }>();

  const handleBackClick = () => {
    router.back();
  };

  const handleOrdersClick = () => {
    router.push(`/${slug}/orders`);
  };

  return (
    <div className="relative h-[300px] w-full">
      <Button
        variant={"secondary"}
        size={"icon"}
        className="absolute left-4 top-4 z-50 rounded-full"
        onClick={handleBackClick}
      >
        <ChevronLeftIcon />
      </Button>
      <Image
        src={product.imageUrl}
        alt={product.name}
        fill
        className="object-contain"
      />

      <Button
        variant={"secondary"}
        size={"icon"}
        className="absolute right-4 top-4 z-50 rounded-full"
        onClick={handleOrdersClick}
      >
        <ScrollTextIcon />
      </Button>
    </div>
  );
}
