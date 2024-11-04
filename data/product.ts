"use server";

import { db } from "@/lib/db";

export const getProducts = async () => {
  const products = await db.product.findMany({
    include: {
      productType: true,
    },
  });
  return JSON.stringify(products);
};

export const getProductById = async (id: string) => {
  try {
    const product = await db.product.findUnique({
      where: { id },
    });
    return product;
  } catch (error) {
    return null;
  }
};
