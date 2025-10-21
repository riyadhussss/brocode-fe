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
    { name: "Dashboard", url: "/admin/dashboard", icon: Home },
    {
      name: "Manajemen Admin",
      url: "/admin/manajemen-admin",
      icon: ShieldUser,
    },
    {
      name: "Manajemen Capster",
      url: "/admin/manajemen-capster",
      icon: Scissors,
    },
    { name: "Manajemen Kasir", url: "/admin/manajemen-kasir", icon: Computer },
    {
      name: "Manajemen Layanan",
      url: "/admin/manajemen-layanan",
      icon: SquareMenu,
    },
    { name: "Manajemen User", url: "/admin/manajemen-user", icon: User },
    {
      name: "Riwayat Reservasi",
      url: "/admin/riwayat-reservasi",
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
