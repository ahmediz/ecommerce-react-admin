import { DataTable } from "@/components/ui/data-table";
import { useBrands } from "./data/use-brands";
import { brandsColumns } from "./table";
import { Link, Outlet, useNavigate } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BrandsPage() {
  const { brands, deleteBrand } = useBrands();
  const navigate = useNavigate();
  const editBrand = (id: string) => {
    navigate({ to: `/brands/edit/${id}` });
  };
  return (
    <>
      <div className="space-y-2">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Brands</h1>
          <Link to="/brands/add">
            <Button variant="default">
              <Plus />
              Add Brand
            </Button>
          </Link>
        </div>
        <DataTable columns={brandsColumns} data={brands} onDelete={deleteBrand.mutate} onEdit={editBrand} />
      </div>
      <Outlet />
    </>
  );
}
