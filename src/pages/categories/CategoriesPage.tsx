import { DataTable } from "@/components/ui/data-table";
import { categoriesColumns } from "./data/table";
import { useCategories } from "./data/use-categories";

export function CategoriesPage() {
  const { categories } = useCategories();
  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-semibold">Categories</h1>
      <DataTable columns={categoriesColumns} data={categories} />
    </div>
  );
}
