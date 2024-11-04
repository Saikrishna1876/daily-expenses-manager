"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Product, ProductType } from "@prisma/client";
import { useEffect, useState, useTransition } from "react";

import { ProductFormSchema } from "@/schemas";
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
import { createOrUpdateProduct } from "@/actions/product";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { getProductTypes } from "@/data/product-type";
import { toast } from "sonner";
import { ExtendedProduct } from "@/types";

interface ProductFormProps {
  initialData?: ExtendedProduct;
}

export function ProductForm({ initialData }: ProductFormProps) {
  const router = useRouter();
  const action = initialData ? "Update" : "Add";
  const [currentProductType, setCurrentProductType] = useState<string>("");
  if (initialData && currentProductType == "")
    setCurrentProductType(initialData.productType.name);

  const [productTypes, setProductTypes] = useState<ProductType[]>([]);
  useEffect(() => {
    getProductTypes(true).then((data) => setProductTypes(JSON.parse(data)));
  }, []);
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof ProductFormSchema>>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: initialData || {
      name: "",
      price: 0,
      productTypeId: "",
    },
  });

  function onFormSubmit(values: z.infer<typeof ProductFormSchema>) {
    startTransition(async () => {
      await createOrUpdateProduct(values, initialData?.id).then((response) => {
        toast.success(`Product ${action}ed!`);
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
                <Input placeholder="Milk" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          disabled={isPending}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type="number" placeholder="99.99" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="productTypeId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Type</FormLabel>
              <Select
                disabled={isPending}
                onValueChange={(value) => {
                  field.onChange(value);
                  setCurrentProductType(
                    productTypes.find((productType) => productType.id === value)
                      ?.name || ""
                  );
                }}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      defaultValue={field.value}
                      placeholder="Select a Product Type"
                    >
                      {currentProductType}
                    </SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {productTypes?.map((productType: ProductType) => (
                    <SelectItem key={productType.id} value={productType.id}>
                      {productType.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
