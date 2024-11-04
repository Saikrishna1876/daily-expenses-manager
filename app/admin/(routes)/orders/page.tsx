"use client";
import { useEffect, useState } from "react";
import { Order } from "@prisma/client";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { getOrders } from "@/data/order";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

function OrderTypes() {
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => {
    getOrders().then((orders) => {
      setOrders(orders);
    });
  }, []);
  return (
    <div>
      <div className="flex items-center justify-between">
        <Heading title="Orders" description="" />
      </div>
      <Separator className="my-4" />
      <DataTable columns={columns} data={orders} searchKey="id" />
    </div>
  );
}

export default OrderTypes;
