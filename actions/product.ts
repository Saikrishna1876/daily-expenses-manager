"use server";

import { getProductTypeById } from "@/data/product-type";
import * as z from "zod";
import { ProductFormSchema } from "@/schemas";
import { db } from "@/lib/db";

async function validateForm(data: z.infer<typeof ProductFormSchema>) {
  const validatedForm = ProductFormSchema.safeParse(data);

  if (!validatedForm.success) return { error: "Invalid fields" };

  const { name, price, productTypeId } = validatedForm.data;

  const productType = await getProductTypeById(productTypeId);
  if (!productType) return { error: "Invalid Product Type Id" };

  return { data: { name, price, productTypeId } };
}

export const createOrUpdateProduct = async (
  data: z.infer<typeof ProductFormSchema>,
  id?: string
) => {
  const validateData = await validateForm(data);
  if (!validateData.data) return validateData.error;

  const { name, price, productTypeId } = validateData.data;

  const product = await db.product.upsert({
    where: {
      id: id || "",
    },
    create: {
      name,
      price,
      productTypeId,
    },
    update: {
      name,
      price,
      productTypeId,
    },
  });
  return product;
};

export const createProduct = async (
  data: z.infer<typeof ProductFormSchema>
) => {
  const validateData = await validateForm(data);
  if (!validateData.data) return validateData.error;

  const { name, price, productTypeId } = validateData.data;

  const product = await db.product.create({
    data: {
      name,
      price,
      productTypeId,
    },
  });
  return product;
};

export const deleteProduct = async (id: string) => {
  const product = await db.product.delete({
    where: {
      id,
    },
  });
  return product;
};
