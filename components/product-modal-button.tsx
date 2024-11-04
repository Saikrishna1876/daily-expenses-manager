"use client";
import { useState } from "react";
import { PlusIcon } from "@radix-ui/react-icons";

import ProductModal from "./modals/product-modal";
import { useProductModal } from "@/hooks/use-product-modal";
import { Button } from "./ui/button";
import { OrderProductFormSchema } from "@/schemas";
import { z } from "zod";

interface ProductModalProps {
  onChange: (value: z.infer<typeof OrderProductFormSchema>[]) => void;
}

function ProductModalButton({ onChange }: ProductModalProps) {
  const [value, setValue] = useState<z.infer<typeof OrderProductFormSchema>[]>(
    []
  );
  const productModal = useProductModal();
  const onSubmit = (item: z.infer<typeof OrderProductFormSchema>) => {
    let exit = false;
    value.map((product) => {
      if (product.productId == item.productId) {
        product.quantity += item.quantity;
        product.totalPrice += item.totalPrice;
        exit = true;
      }
      return product;
    });
    if (!exit) {
      setValue([...value, item]);
      onChange([...value, item]);
    } else {
      setValue(value);
      onChange(value);
    }
    productModal.onClose();
  };
  return (
    <>
      <ProductModal {...productModal} onSubmit={onSubmit} />
      <Button
        type="button"
        variant="secondary"
        className="flex justify-between items-center gap-x-2"
        onClick={productModal.onOpen}
      >
        <PlusIcon />
        Add Product
      </Button>
    </>
  );
}

export default ProductModalButton;
