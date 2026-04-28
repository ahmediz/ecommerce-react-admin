import type { ApiResponseWithPagination } from "@/models/api-response.model";
import { apiFetch } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import type { ProductOutputDTO } from "@/pages/products/dto/ProductOutputDTO";

const getProducts = async (page: number, limit: number) => {
  const response = await apiFetch<ApiResponseWithPagination<ProductOutputDTO[]>>({
    path: "/products",
    query: {
      page,
      limit,
    },
  });
  return response;
};

type GetProducts = {
  page?: number;
  limit?: number;
};

export function useProducts({ page = 1, limit = 10 }: GetProducts) {
  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["products", page, limit],
    queryFn: () => getProducts(page, limit),
  });

  return {
    products: data?.result,
    total: data?.total,
    page: data?.page,
    limit: data?.limit,
    isLoading,
    isError,
    isFetching,
  };
}
