import * as z from "zod";
import { OrderProductFormSchema } from "@/schemas";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { currencyFormatter } from "@/lib/utils";

export const columns: ColumnDef<z.infer<typeof OrderProductFormSchema>>[] = [
  {
    accessorKey: "productName",
    header: "Name",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "totalPrice",
    header: "Total",
    cell: ({ row }) => currencyFormatter.format(row.original.totalPrice),
  },
];
