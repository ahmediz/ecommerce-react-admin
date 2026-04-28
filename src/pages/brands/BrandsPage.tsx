import { DataTable } from "@/components/ui/data-table";
import { useBrands } from "./data/use-brands";
import { brandsColumns } from "./table";

export function BrandsPage() {
  const { brands } = useBrands();
  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-semibold">Brands</h1>
      <DataTable columns={brandsColumns} data={brands} />
    </div>
  );
}

