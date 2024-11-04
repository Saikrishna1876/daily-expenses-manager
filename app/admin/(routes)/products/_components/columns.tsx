import { ExtendedProduct } from "@/types";
import { Product } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { CellAction } from "./cell-action";
import { currencyFormatter } from "@/lib/utils";

export const columns: ColumnDef<ExtendedProduct>[] = [
  {
    accessorKey: "id",
    header: "#",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      return currencyFormatter.format(Number(row.original.price));
    },
  },
  {
    accessorKey: "productType",
    header: "Product Type",
    cell: ({ row }) => {
      return row.original.productType.name;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Data",
    cell: ({ row }) => {
      return format(row.original.createdAt, "MMMM do, yyyy");
    },
  },
  {
    id: "action",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
