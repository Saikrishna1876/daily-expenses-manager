import ProductModal from "@/components/modals/product-modal";
import { Button } from "@/components/ui/button";
import { useProductModal } from "@/hooks/use-product-modal";
import { OrderProductFormSchema } from "@/schemas";
import { useState } from "react";
import * as z from "zod";

export const CellAction = ({
  data,
}: {
  data: z.infer<typeof OrderProductFormSchema>;
}) => {
  return (
    <>
      <Button type="button" variant="destructive" onClick={() => {}}>
        Delete
      </Button>
    </>
  );
};
