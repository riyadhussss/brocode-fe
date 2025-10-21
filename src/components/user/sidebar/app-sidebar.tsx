"use client";

import * as React from "react";
import {
  History,
  Home,
  User,
  LogOut,
  ShieldUser,
  Scissors,
  Computer,
  SquareMenu,
  Plus,
} from "lucide-react";

import { NavMain } from "@/components/admin/sidebar/nav-main";
import { NavUser } from "@/components/admin/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { NavFooter } from "./nav-footer";

// This is sample data.
const data = {
  user: {
    name: "Admin",
    email: "Admin@brocode.com",
  },

  items: [
    // { name: "Dashboard", url: "/user/dashboard", icon: Home },
    {
      name: "Reservasi",
      url: "/user/reservasi",
      icon: Plus,
    },
    {
      name: "Riwayat Reservasi",
      url: "/user/riwayat-reservasi",
      icon: History,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavUser user={data.user} />
      </SidebarHeader>
      {/* <Separator className="bg-gray-700" /> */}
      <SidebarContent>
        <NavMain items={data.items} />
      </SidebarContent>
      <SidebarFooter>
        <NavFooter />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
