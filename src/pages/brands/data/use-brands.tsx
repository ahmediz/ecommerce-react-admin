import type { ApiResponse } from "@/models/api-response.model";
import { apiFetch } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { BrandOutputDTO } from "@/pages/brands/dto/BrandOutputDTO";

import { toast } from "sonner";

const getBrands = async () => {
  const response = await apiFetch<ApiResponse<BrandOutputDTO[]>>({
    path: "/brands",
  });
  return response;
};

const addBrand = async (brand: Pick<BrandOutputDTO, "name">) => {
  const response = await apiFetch<ApiResponse<BrandOutputDTO>>({
    path: "/brands",
    method: "POST",
    body: brand,
  });
  return response;
};

const updateBrandById = async (id: string, brand: Pick<BrandOutputDTO, "name">) => {
  const response = await apiFetch<ApiResponse<BrandOutputDTO>>({
    path: `/brands/${id}`,
    method: "PUT",
    body: brand,
  });
  return response;
};

const deleteBrandById = async (id: string) => {
  await apiFetch({
    path: `/brands/${id}`,
    method: "DELETE",
  });
  return id;
};

export function useBrands() {
  const queryClient = useQueryClient();
  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["brands"],
    queryFn: () => getBrands(),
  });

  const createBrand = useMutation({
    mutationFn: (brand: Pick<BrandOutputDTO, "name">) => addBrand(brand),
    onSuccess: (response: ApiResponse<BrandOutputDTO>) => {
      queryClient.setQueryData(
        ["brands"],
        (old: ApiResponse<BrandOutputDTO[]>) => {
          return { result: [response.result, ...old.result] };
        },
      );
      toast.success("Brand created successfully");
    },
  });

  const updateBrand = useMutation({
    mutationFn: ({ id, brand }: { id: string, brand: Pick<BrandOutputDTO, "name"> }) => updateBrandById(id, brand),
    onSuccess: (response: ApiResponse<BrandOutputDTO>) => {
      queryClient.setQueryData(
        ["brands"],
        (old: ApiResponse<BrandOutputDTO[]>) => {
          return { result: old.result.map(x => x.id === response.result.id ? response.result : x) };
        },
      );
      toast.success("Brand updated successfully");
    },
  });

  const deleteBrand = useMutation({
    mutationFn: (id: string) => deleteBrandById(id),
    onSuccess: (id: string) => {
      queryClient.setQueryData(
        ["brands"],
        (old: ApiResponse<BrandOutputDTO[]>) => {
          return { result: old.result.filter((brand) => brand.id !== id) };
        },
      );
      toast.success("Brand deleted successfully");
    },
  });

  return {
    brands: data?.result,
    isLoading,
    isError,
    isFetching,
    createBrand,
    updateBrand,
    deleteBrand
  };
}
