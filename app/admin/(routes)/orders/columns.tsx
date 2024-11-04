import { Order } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "#",
  },
  {
    accessorKey: "totalPrice",
    header: "Total",
  },
  {
    accessorKey: "createdAt",
    header: "Data",
    cell: ({ row }) => {
      return format(row.original.createdAt, "MMMM do, yyyy");
    },
  },
];
