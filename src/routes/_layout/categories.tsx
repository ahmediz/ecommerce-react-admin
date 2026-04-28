import { createFileRoute } from "@tanstack/react-router";

import { CategoriesPage } from "@/pages/categories/CategoriesPage";

export const Route = createFileRoute("/_layout/categories")({
  component: CategoriesPage,
});

