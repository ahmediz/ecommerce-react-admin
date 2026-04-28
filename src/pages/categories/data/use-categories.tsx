import type { ApiResponse } from "@/models/api-response.model";
import { apiFetch } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import type { CategoryOutputDTO } from "@/pages/categories/dto/CategoryOutputDTO";

const getCategories = async () => {
  const response = await apiFetch<ApiResponse<CategoryOutputDTO[]>>({
    path: "/categories",
  });
  return response;
};

export function useCategories() {
  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });

  return {
    categories: data?.result,
    isLoading,
    isError,
    isFetching,
  };
}
