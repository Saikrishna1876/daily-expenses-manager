import { Product, ProductType } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { CellAction } from "./cell-action";
import { ExtendedProductType } from "@/types";

export const columns: ColumnDef<ExtendedProductType>[] = [
  {
    accessorKey: "id",
    header: "#",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "Linked Products",
    cell: ({ row }) => {
      return (
        <div className="pl-4 text-muted-foreground">
          {row.original.products.length}
        </div>
      );
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
