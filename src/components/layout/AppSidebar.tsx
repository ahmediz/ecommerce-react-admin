import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Box, Building, Home, List } from "lucide-react";
import { useState } from "react";
import { Link } from "@tanstack/react-router";

export function AppSidebar() {
  const [navItems] = useState([
    {
      label: "Home",
      icon: <Home />,
      href: "/",
    },
    {
      label: "Products",
      icon: <Box />,
      href: "/products",
    },
    {
      label: "Categories",
      icon: <List />,
      href: "/categories",
    },
    {
      label: "Brands",
      icon: <Building />,
      href: "/brands",
    },
  ]);

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Building className="bg-primary text-primary-foreground rounded-md p-2 w-8 h-8" />
          Ecommerce Admin
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <Link
              to={item.href}
              key={item.href}
              activeProps={{
                className: "bg-sidebar-accent text-sidebar-accent-foreground",
              }}
            >
              <SidebarMenuItem>
                <SidebarMenuButton>
                  {item.icon}
                  {item.label}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </Link>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
