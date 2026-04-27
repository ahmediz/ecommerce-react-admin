import { RouterProvider } from "@tanstack/react-router";

import { router } from "@/router/router";
import { SidebarProvider } from "./components/ui/sidebar";

export default function App() {
  return (
    <>
      <SidebarProvider>
        <RouterProvider router={router} />
      </SidebarProvider>
    </>
  );
}
