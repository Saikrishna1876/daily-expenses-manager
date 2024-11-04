import { z } from "zod";

export const ProductTypeFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
});

export const ProductFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  price: z.coerce.number().min(1, {
    message: "Price must be at least 1.",
  }),
  productTypeId: z.string(),
});

export const OrderProductFormSchema = z.object({
  productId: z.string(),
  productName: z.string().nullable(),
  quantity: z.coerce.number().min(1, {
    message: "Quantity must be at least 1.",
  }),
  totalPrice: z.number().default(1),
});
export const OrderFormSchema = z.object({
  items: OrderProductFormSchema.array(),
});
