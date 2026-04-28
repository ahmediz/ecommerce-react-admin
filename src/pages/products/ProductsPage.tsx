import { DataTable } from "@/components/ui/data-table";
import { useProducts } from "@/pages/products/data/use-products";
import { columns } from "./data/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "@/components/ui/pagination";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function ProductsPage() {
  const params = useSearch({ from: "/_layout/products" });
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
      <Pagination>
        <PaginationContent>
          <PaginationItem
            className={cn(
              currentPage === 1 && "pointer-events-none opacity-50",
            )}
          >
            <PaginationPrevious onClick={() => goToPage(currentPage - 1)} />
          </PaginationItem>
          {Array.from({ length: totalPages }).map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                onClick={() => goToPage(index + 1)}
                isActive={currentPage === index + 1}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          {totalPages > 3 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          <PaginationItem
            className={cn(
              currentPage === totalPages && "pointer-events-none opacity-50",
            )}
          >
            <PaginationNext onClick={() => goToPage(currentPage + 1)} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
