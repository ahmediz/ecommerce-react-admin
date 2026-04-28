import type { ColumnDef } from "@tanstack/react-table";
import type { ProductOutputDTO } from "../dto/ProductOutputDTO";
export const columns: ColumnDef<ProductOutputDTO>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "imageUrl",
    header: "Image",
  },
  {
    accessorKey: "brand.name",
    header: "Brand",
  },
  {
    accessorKey: "availableStock",
    header: "Available Stock",
  },
  {
    accessorKey: "reservedStock",
    header: "Reserved Stock",
  },
  {
    accessorKey: "isActive",
    header: "Active",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
];
