"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import ProductModalButton from "@/components/product-modal-button";
import { OrderFormSchema, OrderProductFormSchema } from "@/schemas";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { useTransition } from "react";
import { createOrder } from "@/actions/order";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function NewForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof OrderFormSchema>>({
    resolver: zodResolver(OrderFormSchema),
    defaultValues: {
      items: [],
    },
  });

  function onSubmit(values: z.infer<typeof OrderFormSchema>) {
    startTransition(async () => {
      await createOrder(values).then((res) => {
        if (res.order) {
          toast.success("Order created!");
          router.refresh();
          router.push("/");
        }
      });
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="items"
          disabled={isPending}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <ProductModalButton onChange={field.onChange} />
              </FormControl>
              <DataTable
                columns={columns}
                data={field.value}
                searchKey="productName"
              />
              <div className="flex justify-end items-center gap-x-2 font-semibold">
                <span className="font-bold">Total: </span>
                <span>
                  {field.value.reduce(
                    (prev, item) => prev + item.totalPrice,
                    0
                  )}
                </span>
              </div>
            </FormItem>
          )}
        />
        <Button disabled={isPending} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}

export default NewForm;
