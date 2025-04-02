"use server";

import { ConsumptionMethod } from "@prisma/client";

import { db } from "@/lib/prisma";

import { removeCpfPunctuation } from "../helpers/cpf";

interface CreateOrderInput {
  customerName: string;
  customerCpf: string;
  products: Array<{
    id: string;
    price: number;
    quantity: number;
  }>;
  consumptionMethod: ConsumptionMethod;
  restaurantSlug: string;
}

export const createOrder = async (input: CreateOrderInput) => {
  const {
    customerName,
    customerCpf,
    products,
    consumptionMethod,
    restaurantSlug,
  } = input;

  const restaurant = await db.restaurant.findUnique({
    where: {
      slug: restaurantSlug,
    },
  });

  if (!restaurant) {
    throw new Error("Restaurant not found");
  }

  const productsWithPrices = await db.product.findMany({
    where: {
      id: {
        in: input.products.map((product) => product.id),
      },
    },
  });

  const productsWithPricesAndQuantities = products.map((product) => ({
    productId: product.id,
    quantity: product.quantity,
    price: productsWithPrices.find((p) => p.id === product.id)!.price,
  }));

  await db.order.create({
    data: {
      status: "PENDING",
      customerName,
      customerCpf: removeCpfPunctuation(customerCpf),
      restaurantId: restaurant.id,
      orderProducts: {
        createMany: {
          data: productsWithPricesAndQuantities,
        },
      },
      total: productsWithPricesAndQuantities.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0,
      ),
      consumptionMethod,
    },
  });
};
