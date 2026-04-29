import { RouterProvider } from "@tanstack/react-router";

import { router } from "@/router/router";
import { SidebarProvider } from "./components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner"

const queryClient = new QueryClient();

export default function App() {
  return (
    <>
      <SidebarProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
        <Toaster position="top-right" />
      </SidebarProvider>
    </>
  );
}
