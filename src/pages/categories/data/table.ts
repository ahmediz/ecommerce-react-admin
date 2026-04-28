import type { ColumnDef } from "@tanstack/react-table";
import type { CategoryOutputDTO } from "../dto/CategoryOutputDTO";
export const categoriesColumns: ColumnDef<CategoryOutputDTO>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  }
];
