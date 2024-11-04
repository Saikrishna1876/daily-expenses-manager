"use client";
import { Calendar } from "@/components/ui/calendar";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { getOrdersByDate } from "@/data/order";
import { Order, OrderItem, Product } from "@prisma/client";
import { useEffect, useState } from "react";
import { ActiveModifiers } from "react-day-picker";
import { columns } from "./_components/columns";
import { currencyFormatter } from "@/lib/utils";

export type PageOrderItem = OrderItem & {
  product: Product;
};

type PageOrder = Order & {
  orderItems: PageOrderItem[];
};

function Home() {
  const monthBuget = 10_000;
  const [currentOrders, setCurrentOrders] = useState<PageOrder[]>([]);
  const [orders, setOrders] = useState<PageOrder[]>([]);
  const [totalMonthExpenditure, setTotalMonthExpenditure] = useState<number>(0);
  const [prev, setPrev] = useState<number>(new Date().getMonth() - 1);
  const [prevDay, setPrevDay] = useState<Date | undefined>(undefined);
  const [date, setDate] = useState<Date | undefined>(new Date());

  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
    const fetchOrder = async () => {
      if (!date) return;
      if (date.getMonth() !== prev) {
        await getOrdersByDate(date).then((value) => {
          const returnValue = JSON.parse(value) as PageOrder[];
          setCurrentOrders(returnValue);
          let preOrders: PageOrder[] = [];
          for (const orderItem of returnValue) {
            if (new Date(orderItem.createdAt).getDate() == date.getDate()) {
              preOrders.push(orderItem);
            }
          }
          setOrders(preOrders);
          setTotalMonthExpenditure(
            returnValue.reduce((acc, curr) => acc + Number(curr.totalPrice), 0)
          );
        });
        setPrev(date.getMonth());
      }
    };
    fetchOrder();
  }, [date, prev, orders]);

  if (!isMounted) return null;

  const onSelect = (
    day: Date | undefined,
    selectedDay: Date,
    activeModifiers: ActiveModifiers
  ) => {
    setOrders([]);
    if (
      `${day?.getFullYear()}-${(day?.getMonth() || 0) + 1}-${day?.getDate()}` ==
      `${prevDay?.getFullYear()}-${
        (prevDay?.getMonth() || 0) + 1
      }-${prevDay?.getDate()}`
    )
      return;
    let preOrders: PageOrder[] = [];
    setPrevDay(day);
    setDate(day);
    currentOrders?.map((orderItem) => {
      if (new Date(orderItem.createdAt).getDate() == selectedDay.getDate()) {
        preOrders.push(orderItem);
      }
    });
    setOrders(preOrders);
  };

  return (
    <section className="flex flex-col gap-y-4">
      <div className="flex flex-col md:flex-row gap-x-6 justify-between items-center rounded-xl shadow-md border md:border-none md:shadow-none">
        <div className="flex w-full justify-between gap-x-4 md:shadow-md md:rounded-xl md:border p-4 items-center">
          <span className="text-sm font-medium">This month&apos;s budget</span>
          <span className="text-xl">
            {currencyFormatter.format(monthBuget)}
          </span>
        </div>
        <div className="flex w-full justify-between gap-x-4 md:shadow-md md:rounded-xl md:border p-4 items-center">
          <span className="text-sm font-medium">
            This month&apos;s expenditure
          </span>
          <span className="text-xl">
            {currencyFormatter.format(totalMonthExpenditure)}
          </span>
        </div>
        <div className="flex w-full justify-between gap-x-4 md:shadow-md md:rounded-xl md:border p-4 items-center">
          <span className="text-sm font-medium">
            This month&apos;s remaining balance
          </span>
          <span className="text-xl">
            {currencyFormatter.format(monthBuget - totalMonthExpenditure)}
          </span>
        </div>
      </div>
      <div className="flex flex-col md:flex-row w-full justify-between gap-x-4 shadow-md border md:px-3 md:py-4 divide-y md:divide-y-0 divide-secondary rounded-xl mb-4">
        <Calendar
          mode="single"
          selected={date}
          onSelect={onSelect}
          className="w-full pr-5 md:w-auto md:border-r border-secondary"
        />
        <div className="w-full py-2 md:py-0 px-5 h-full">
          <div className="flex flex-col gap-y-2 md:gap-y-0 md:flex-row justify-between md:items-center">
            <h1 className="text-2xl font-bold">Order Summary</h1>
            <div className="flex items-center justify-between w-full md:w-auto md:gap-x-4">
              <span className="text-muted-foreground text-sm">
                {date?.toLocaleDateString()}
              </span>
              <span>
                Total Price:{" "}
                {currencyFormatter.format(
                  orders.reduce((acc, curr) => acc + Number(curr.totalPrice), 0)
                )}
              </span>
            </div>
          </div>
          <Separator className="mt-4" />
          <div className="relative h-full w-full">
            {orders.length == 0 ? (
              <div className="h-full my-4 w-full text-muted-foreground text-sm">
                No Results Found.
              </div>
            ) : (
              <div className="divide-y divide-secondary">
                {orders.map((order) => (
                  <div className="py-4" key={order.id}>
                    <span className="w-full flex text-lg">
                      Order Total:{" "}
                      {currencyFormatter.format(Number(order.totalPrice))}
                    </span>
                    <DataTable
                      columns={columns}
                      data={order.orderItems}
                      search={false}
                      pagination={false}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
