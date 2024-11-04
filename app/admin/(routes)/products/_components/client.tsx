"use client";

import ProductFormModal from "@/components/modals/product-form-modal";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ExtendedProduct } from "@/types";
import { PlusIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { columns } from "./columns";

interface ClientProps {
  initialData: ExtendedProduct[];
}

function Client({ initialData }: ClientProps) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <ProductFormModal isOpen={open} onClose={() => setOpen(false)} />
      <div className="flex items-center justify-between">
        <Heading title="Product" description="" />
        <Button
          className="flex justify-between gap-x-2"
          onClick={() => setOpen(true)}
        >
          <PlusIcon /> Add Product
        </Button>
      </div>
      <Separator className="my-4" />
      <DataTable columns={columns} data={initialData} searchKey="name" />
    </div>
  );
}

export default Client;
