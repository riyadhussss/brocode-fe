"use client";

import * as React from "react";
import { History, Home, Clock, CalendarClock } from "lucide-react";

import { NavMain } from "@/components/admin/sidebar/nav-main";
import { NavUser } from "@/components/admin/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavFooter } from "./nav-footer";

// This is sample data.
const data = {
  items: [
    { name: "Dashboard", url: "/kasir/dashboard", icon: Home },
    {
      name: "Atur Jadwal",
      url: "/kasir/atur-jadwal",
      icon: Clock,
    },
    {
      name: "Reservasi di Tempat",
      url: "/kasir/reservasi-di-tempat",
      icon: CalendarClock,
    },
    {
      name: "Riwayat Reservasi",
      url: "/kasir/riwayat-reservasi",
      icon: History,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavUser />
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
