"use client";
import ProductTypeFormModal from "@/components/modals/product-type-form-modal";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ExtendedProductType } from "@/types";
import { PlusIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { columns } from "./columns";

interface ClientProps {
  initialData: ExtendedProductType[];
}
function Client({ initialData }: ClientProps) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <ProductTypeFormModal isOpen={open} onClose={() => setOpen(false)} />
      <div className="flex items-center justify-between">
        <Heading title="Product Types" description="" />
        <Button
          className="flex justify-between gap-x-2"
          onClick={() => setOpen(true)}
        >
          <PlusIcon /> Add Product Type
        </Button>
      </div>
      <Separator className="my-4" />
      <DataTable columns={columns} data={initialData} searchKey="name" />
    </div>
  );
}

export default Client;
