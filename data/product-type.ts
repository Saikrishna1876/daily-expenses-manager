"use server";

import { db } from "@/lib/db";

export const getProductTypes = async (desc: boolean = false) => {
  const productTypes = await db.productType.findMany({
    orderBy: {
      createdAt: desc ? "desc" : undefined,
    },
    include: {
      products: true,
    },
  });
  return JSON.stringify(productTypes);
};

export const getProductTypeById = async (id: string) => {
  try {
    const productType = await db.productType.findUnique({
      where: { id },
    });
    return productType;
  } catch (error) {
    return null;
  }
};
