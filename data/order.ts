"use server";

import { db } from "@/lib/db";

export const getOrders = async () => {
  const orders = await db.order.findMany();
  return orders;
};

export const getOrdersByDate = async (date: Date) => {
  const orders = await db.order.findMany({
    where: {
      createdAt: {
        gte: new Date(`${date.getFullYear()}-${date.getMonth() + 1}-01`),
        lte: new Date(`${date.getFullYear()}-${date.getMonth() + 1}-31`),
      },
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });
  return JSON.stringify(orders);
};
