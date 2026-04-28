import { DataTable } from "@/components/ui/data-table";
import { useProducts } from "@/pages/products/data/use-products";
import { columns } from "./data/table";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { CustomPagination } from "@/components/pagination";

export function ProductsPage() {
  const params = useSearch({ from: "/_app/products" });
  const navigate = useNavigate();
  const currentPage = parseInt(params.page ?? 1);
  const { products, total, limit } = useProducts({ page: currentPage });
  const totalPages = Math.ceil((total ?? 0) / (limit ?? 10));

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    navigate({
      search: {
        ...params,
        page,
      },
    });
  };

  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-semibold">Products</h1>
      <DataTable columns={columns} data={products} />
      <CustomPagination currentPage={currentPage} totalPages={totalPages} goToPage={goToPage} />
    </div>
  );
}
