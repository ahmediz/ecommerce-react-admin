import { AddNewBrandPage } from "@/pages/brands/AddNewBrandPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/brands/add")({
  component: AddNewBrandPage,
});
