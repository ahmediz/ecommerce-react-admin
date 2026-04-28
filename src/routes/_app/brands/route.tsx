import { BrandsPage } from "@/pages/brands/BrandsPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/brands")({
  component: BrandsPage,
});
