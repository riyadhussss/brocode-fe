"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
  };
}) {
  return (
    <SidebarMenuButton
      size="lg"
      className="
        data-[state=open]:bg-sidebar-accent 
        data-[state=open]:text-sidebar-accent-foreground 
        hover:bg-transparent hover:text-inherit
        focus-visible:ring-0 focus-visible:ring-offset-0
      "
    >
      <Avatar className="h-8 w-8 rounded-lg">
        <AvatarImage src="/assets/logo2.png" alt={user.name} />
        <AvatarFallback className="rounded-lg">CN</AvatarFallback>
      </Avatar>
      <Separator orientation="vertical" className="bg-gray-700" />
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-semibold">{user.name}</span>
        <span className="truncate text-xs">{user.email}</span>
      </div>
    </SidebarMenuButton>
  );
}
