"use server";

import { getProductById } from "@/data/product";
import * as z from "zod";
import { db } from "@/lib/db";
import { OrderFormSchema } from "@/schemas";

export const createOrder = async (data: z.infer<typeof OrderFormSchema>) => {
  const validatedForm = OrderFormSchema.safeParse(data);

  if (!validatedForm.success) return { error: "Invalid fields" };

  const { items } = validatedForm.data;

  let totalPrice = 0;
  for (const item of items) {
    const product = await getProductById(item.productId);
    if (!product) return { error: "Invalid Product Id" };
    totalPrice += item.totalPrice;
  }

  const order = await db.order.create({
    data: {
      orderItems: {
        createMany: {
          data: items.map((item) => ({
            quantity: item.quantity,
            productId: item.productId,
            currentPrice: item.totalPrice,
          })),
        },
      },
      totalPrice,
    },
  });
  return { order };
};
