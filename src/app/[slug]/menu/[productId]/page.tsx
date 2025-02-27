import React from "react";

import { db } from "@/lib/prisma";

import ProductHeader from "./components/product-header";

interface ProductPageProps {
  params: Promise<{ slug: string; productId: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug, productId } = await params;
  const product = await db.product.findUnique({
    where: { id: productId },
  });
  if (!product) {
    return <div>Produto não encontrado</div>;
  }

  return (
    <>
      <ProductHeader product={product} />
      {slug}
    </>
  );
}
