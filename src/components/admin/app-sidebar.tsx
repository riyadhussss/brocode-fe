"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
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
import "@/app/globals.css";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const menu_items = [
  { title: "Dashboard", url: "/admin/dashboard", icon: Home },
  { title: "Manajemen Admin", url: "/admin/manajemen-admin", icon: ShieldUser },
  {
    title: "Manajemen Capster",
    url: "/admin/manajemen-capster",
    icon: Scissors,
  },
  { title: "Manajemen Kasir", url: "/admin/manajemen-kasir", icon: Computer },
  {
    title: "Manajemen Layanan",
    url: "/admin/manajemen-layanan",
    icon: SquareMenu,
  },
  {
    title: "Riwayat Reservasi",
    url: "/admin/riwayat-reservasi",
    icon: History,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  // Tooltip helper → supaya tidak berulang
  const withTooltip = (children: React.ReactNode, label: string) =>
    isCollapsed ? (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{children}</TooltipTrigger>
          <TooltipContent side="right">{label}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ) : (
      children
    );

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="px-2 py-2">
        {/* Header Sidebar */}
        <SidebarHeader className="px-2 mt-2">
          <div className="flex items-center gap-2">
            <Image
              src="/assets/logo.png"
              width={60}
              height={40}
              alt="Brocode Logo"
              priority
            />
            {!isCollapsed && (
              <div className="flex flex-col pl-2">
                <span className="text-sm font-medium text-white">
                  Admin User
                </span>
                <span className="text-xs text-white">Administrator</span>
              </div>
            )}
          </div>
        </SidebarHeader>

        <Separator className="my-2 bg-gray-700" />

        {/* Menu Utama */}
        <SidebarMenu className="space-y-1">
          {menu_items.map((item) => {
            // ✅ Perbaikan: path aktif juga berlaku untuk sub-route
            const isActive = pathname.startsWith(item.url);

            const button = (
              <SidebarMenuButton
                asChild
                isActive={isActive}
                className={`
                  text-white transition-colors
                  hover:bg-gray-700 hover:text-white
                  ${
                    isActive
                      ? "bg-[#FDFB03] text-black font-semibold hover:bg-[#FDFB03] hover:text-black"
                      : "hover:bg-gray-700 hover:text-white"
                  }
                `}
              >
                <a href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            );

            return (
              <SidebarMenuItem key={item.title}>
                {withTooltip(button, item.title)}
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>

        {/* Footer Sidebar */}
        <SidebarFooter className="mt-auto pb-4 pl-0 pr-0">
          <Separator className="my-2 bg-gray-700" />
          <SidebarMenu className="space-y-1">
            {/* Update Akun */}
            <SidebarMenuItem>
              {withTooltip(
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith("/admin/update-akun")}
                  className={`
                    text-white transition-colors
                    ${pathname.startsWith("/admin/update-akun")
                      ? 'bg-[#FDFB03] text-black font-semibold hover:bg-[#FDFB03] hover:text-black'
                      : 'hover:bg-gray-700 hover:text-white'
                    }
                  `}
                >
                  <a href="/admin/update-akun">
                    <User />
                    <span>Update Akun</span>
                  </a>
                </SidebarMenuButton>,
                "Update Akun"
              )}
            </SidebarMenuItem>

            {/* Logout */}
            <SidebarMenuItem>
              {withTooltip(
                <SidebarMenuButton
                  asChild
                  className="text-white hover:bg-red-700 hover:text-white active:bg-red-700 transition-colors cursor-pointer"
                >
                  <button
                    type="button"
                    onClick={() => console.log("Logout clicked")}
                  >
                    <LogOut />
                    <span>Logout</span>
                  </button>
                </SidebarMenuButton>,
                "Logout"
              )}
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
