import { HomePage } from "@/pages/HomePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/home")({
  component: HomePage,
});
