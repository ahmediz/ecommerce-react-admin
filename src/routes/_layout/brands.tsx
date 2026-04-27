import { createFileRoute } from "@tanstack/react-router";

import { BrandsPage } from "@/pages/BrandsPage";

export const Route = createFileRoute("/_layout/brands")({
  component: BrandsPage,
});

