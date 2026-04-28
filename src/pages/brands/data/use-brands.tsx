import type { ApiResponse } from "@/models/api-response.model";
import { apiFetch } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import type { BrandOutputDTO } from "@/pages/brands/dto/BrandOutputDTO";

const getBrands = async () => {
  const response = await apiFetch<ApiResponse<BrandOutputDTO[]>>({
    path: "/brands"
  });
  return response;
};

export function useBrands() {
  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["brands"],
    queryFn: () => getBrands(),
  });

  return {
    brands: data?.result,
    isLoading,
    isError,
    isFetching,
  };
}
