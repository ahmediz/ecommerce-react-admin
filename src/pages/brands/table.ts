import type { ColumnDef } from "@tanstack/react-table";
import type { BrandOutputDTO } from "./dto/BrandOutputDTO";
export const columns: ColumnDef<BrandOutputDTO>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
];
