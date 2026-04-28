import { AppSidebar } from "@/components/layout/AppSidebar";
import { HeaderBar } from "@/components/layout/HeaderBar";
import { Outlet } from "@tanstack/react-router";

export function AdminLayout() {
  return (
    <>
      <AppSidebar />
      <main className="flex-1 min-w-0">
        <HeaderBar />
        <div className="p-4">
          <Outlet />
        </div>
      </main>
    </>
  );
}
