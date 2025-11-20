"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";

export function NavUser() {
  // State untuk menyimpan data user
  const [userName, setUserName] = useState("User");
  const [userEmail, setUserEmail] = useState("user@example.com");
  const [mounted, setMounted] = useState(false);

  // Ambil name dan email dari cookies setelah component mount (client-side only)
  useEffect(() => {
    setUserName(Cookies.get("name") || "User");
    setUserEmail(Cookies.get("email") || "user@example.com");
    setMounted(true);
  }, []);

  // Tampilkan placeholder saat server-side rendering
  if (!mounted) {
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
          <AvatarImage src="/assets/logo2.png" alt="User" />
        </Avatar>
        <Separator orientation="vertical" className="bg-gray-700" />
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-semibold">User</span>
          <span className="truncate text-xs">user@example.com</span>
        </div>
      </SidebarMenuButton>
    );
  }

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
        <AvatarImage src="/assets/logo2.png" alt={userName} />
      </Avatar>
      <Separator orientation="vertical" className="bg-gray-700" />
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-semibold">{userName}</span>
        <span className="truncate text-xs">{userEmail}</span>
      </div>
    </SidebarMenuButton>
  );
}
