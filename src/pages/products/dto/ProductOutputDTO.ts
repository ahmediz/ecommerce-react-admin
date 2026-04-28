import type { BaseOutputDTO } from "@/models/BaseOutputDTO";

export type ProductOutputDTO = BaseOutputDTO & {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  brandId: string;
  availableStock: number;
  reservedStock: number;
  isActive: boolean;
};
