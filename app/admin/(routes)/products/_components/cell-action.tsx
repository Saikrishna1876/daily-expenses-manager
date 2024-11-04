"use client";
import { deleteProductType } from "@/actions/product-type";
import { AlertModal } from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  DotsHorizontalIcon,
  Pencil2Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { ExtendedProduct } from "@/types";
import { useRouter } from "next/navigation";
import ProductFormModal from "@/components/modals/product-form-modal";
import { deleteProduct } from "@/actions/product";

interface CellActionProps {
  data: ExtendedProduct;
}

export const CellAction = ({ data }: CellActionProps) => {
  const router = useRouter();
  const [openDelete, setDeleteOpen] = useState(false);
  const [openUpdate, setUpdateOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const onDelete = () => {
    startTransition(async () => {
      await deleteProduct(data.id).then(() => {
        toast.success("Product Deleted!");
        router.refresh();
        setDeleteOpen(false);
      });
    });
  };
  return (
    <>
      <AlertModal
        isOpen={openDelete}
        onClose={() => setDeleteOpen(false)}
        loading={isPending}
        onConfirm={onDelete}
      />
      <ProductFormModal
        isOpen={openUpdate}
        onClose={() => setUpdateOpen(false)}
        initialData={data}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="w-8 h-8 p-0">
            <span className="sr-only">Open Menu</span>
            <DotsHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setUpdateOpen(true)}>
            <Pencil2Icon className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setDeleteOpen(true)}
            className="text-destructive"
          >
            <TrashIcon className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
