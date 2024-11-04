import { ColumnDef } from "@tanstack/react-table";
import { PageOrderItem } from "../page";
import { currencyFormatter } from "@/lib/utils";

export const columns: ColumnDef<PageOrderItem>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return row.original.product.name;
    },
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "totalPrice",
    header: "Total",
    cell: ({ row }) => {
      return currencyFormatter.format(Number(row.original.currentPrice));
    },
  },
];
