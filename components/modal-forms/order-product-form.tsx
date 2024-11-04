"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Product } from "@prisma/client";
import { useEffect, useState } from "react";

import { OrderProductFormSchema } from "@/schemas";
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
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { getProducts } from "@/data/product";
import { toast } from "sonner";

interface OrderProductFormProps {
  initialData?: z.infer<typeof OrderProductFormSchema>;
  onSubmit: (data: z.infer<typeof OrderProductFormSchema>) => void;
}

export function OrderProductForm({
  initialData,
  onSubmit,
}: OrderProductFormProps) {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [productId, setProductId] = useState<string>();
  const [quantity, setQuantity] = useState<number>(1);
  const [currentProduct, setCurrentProduct] = useState("");
  useEffect(() => {
    getProducts().then((data) => setProducts(JSON.parse(data)));
  }, []);
  const form = useForm<z.infer<typeof OrderProductFormSchema>>({
    resolver: zodResolver(OrderProductFormSchema),
    defaultValues: initialData || {
      productId: "",
      productName: "",
      quantity: 1,
      totalPrice: 0,
    },
  });

  function onFormSubmit(values: z.infer<typeof OrderProductFormSchema>) {
    const currentProduct = products.find(
      (product) => product.id === values.productId
    );
    if (!currentProduct) {
      toast.error("Add a Valid Product!");
      return;
    }
    values.totalPrice = values.quantity * (Number(currentProduct?.price) || 0);
    onSubmit(values);
    router.refresh();
  }
  return (
    <div className="flex gap-x-2">
      <Select
        onValueChange={(id) => {
          setProductId(id);
          setCurrentProduct(
            products.find((product) => product.id === id)?.name || ""
          );
        }}
        value={productId}
      >
        <SelectTrigger>
          <SelectValue defaultValue={productId} placeholder="Select a Product">
            {currentProduct}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {products?.map((product: Product) => (
            <SelectItem key={product.id} value={product.id}>
              {product.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        type="number"
        min="1"
        onChange={(e) => setQuantity(Number(e.target.value))}
      />
      <Button
        type="button"
        onClick={() =>
          onFormSubmit({
            productId: productId as string,
            productName: currentProduct,
            quantity,
            totalPrice: 0,
          })
        }
      >
        Add
      </Button>
    </div>
  );
}
