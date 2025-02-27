"use client";

import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import React, { useContext } from "react";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helpers/format-currency";

import { CartContext, CartProduct } from "../contexts/cart";

interface CartProductItemProps {
  product: CartProduct;
}

export default function CartProductItem({ product }: CartProductItemProps) {
  const { addProduct, decreaseProductQuantity } = useContext(CartContext);

  return (
    <div className="flex items-center justify-between">
      {/* ESQUERDA */}
      <div className="flex items-center gap-3">
        <div className="relative h-20 w-20 rounded-xl bg-gray-100">
          <Image src={product.imageUrl} alt={product.name} fill />
        </div>

        {/* QUANTIDADE */}
        <div className="max-w-[90%] space-y-1 truncate text-ellipsis">
          <p className="text-xs">{product.name}</p>
          <p className="text-sm font-semibold">
            {formatCurrency(product.price)}
          </p>
          <div className="flex items-center gap-1 text-center">
            <Button
              className="h-7 w-7 rounded-lg"
              variant={"outline"}
              onClick={() => decreaseProductQuantity(product.id)}
            >
              <ChevronLeftIcon />
            </Button>
            <p className="w-7">{product.quantity}</p>
            <Button
              className="h-7 w-7 rounded-lg"
              variant={"destructive"}
              onClick={() =>
                addProduct({
                  ...product,
                  quantity: 1,
                })
              }
            >
              <ChevronRightIcon />
            </Button>
          </div>
        </div>
      </div>

      <Button className="h-7 w-7 rounded-lg" variant={"outline"}>
        <TrashIcon />
      </Button>
    </div>
  );
}
