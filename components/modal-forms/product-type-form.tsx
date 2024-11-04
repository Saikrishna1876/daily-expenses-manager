"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { ProductTypeFormSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createOrUpdateProductType } from "@/actions/product-type";
import { ExtendedProductType } from "@/types";

interface ProductTypeFormProps {
  initialData?: ExtendedProductType;
}

export function ProductTypeForm({ initialData }: ProductTypeFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const action = initialData ? "Update" : "Add";
  const form = useForm<z.infer<typeof ProductTypeFormSchema>>({
    resolver: zodResolver(ProductTypeFormSchema),
    defaultValues: initialData || {
      name: "",
    },
  });

  function onFormSubmit(values: z.infer<typeof ProductTypeFormSchema>) {
    startTransition(async () => {
      await createOrUpdateProductType(values, initialData?.id).then(() => {
        toast.success(`Product Type ${action}ed!`);
        router.refresh();
      });
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          disabled={isPending}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Dairy" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending} type="submit">
          {action}
        </Button>
      </form>
    </Form>
  );
}
