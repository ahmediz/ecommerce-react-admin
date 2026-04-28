import { cn } from "@/lib/utils";
import {
    PaginationContent,
    PaginationItem,
    PaginationPrevious,
    PaginationLink,
    PaginationEllipsis,
    PaginationNext,
    Pagination,
} from "./ui/pagination";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
};

export function CustomPagination({
  currentPage,
  totalPages,
  goToPage,
}: PaginationProps) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem
          className={cn(currentPage === 1 && "pointer-events-none opacity-50")}
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
  );
}
