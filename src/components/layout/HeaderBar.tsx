import { ChevronsUpDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from "../ui/dropdown-menu";
import { SidebarTrigger } from "../ui/sidebar";

export function HeaderBar() {
  return (
    <header className="sticky top-0 z-10 border-b bg-background/70 backdrop-blur">
      <div className="flex h-14 items-center justify-between gap-3 px-4">
        <SidebarTrigger />
        <div className="min-w-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-2 hover:bg-secondary rounded-md p-2">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="truncate text-sm font-semibold">Admin</div>
                <ChevronsUpDown className="ml-auto size-4" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
