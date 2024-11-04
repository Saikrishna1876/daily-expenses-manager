"use server";

import { db } from "@/lib/db";
import * as z from "zod";

import { ProductTypeFormSchema } from "@/schemas";

export const createOrUpdateProductType = async (
  data: z.infer<typeof ProductTypeFormSchema>,
  id?: string
) => {
  const validatedForm = ProductTypeFormSchema.safeParse(data);

  if (!validatedForm.success) {
    return { error: "Invalid fields" };
  }

  const { name } = validatedForm.data;

  const productType = await db.productType.upsert({
    where: {
      id: id || "",
    },
    create: {
      name,
    },
    update: {
      name,
    },
  });
  return productType;
};

export const createProductType = async (
  data: z.infer<typeof ProductTypeFormSchema>
) => {
  const validatedForm = ProductTypeFormSchema.safeParse(data);

  if (!validatedForm.success) {
    return { error: "Invalid fields" };
  }

  const { name } = validatedForm.data;

  const productType = await db.productType.create({
    data: {
      name,
    },
    include: {
      products: true,
    },
  });
  return productType;
};

export const deleteProductType = async (id: string) => {
  const productType = await db.productType.delete({
    where: {
      id,
    },
  });
  return productType;
};
