"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaUser,
  FaHistory,
  FaUserEdit,
  FaSignOutAlt,
  FaTachometerAlt,
} from "react-icons/fa";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    name: "Dashboard",
    href: "/user",
    icon: FaTachometerAlt,
  },
  {
    name: "Riwayat Pemesanan",
    href: "/user/riwayat-pemesanan",
    icon: FaHistory,
  },
];

export function UserSidebar() {
  const pathname = usePathname();

  const handleLogout = () => {
    // Implement logout logic here
    console.log("Logout clicked");
    // Redirect to login page or clear session
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1">
          <div className="w-8 h-8 bg-[#FDFB03] rounded-full flex items-center justify-center">
            <FaUser className="text-black" size={16} />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-white">User</span>
            <span className="text-xs text-gray-300">BroCode</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    tooltip={item.name}
                  >
                    <Link href={item.href}>
                      <Icon />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Update Akun">
              <Link href="/user/update-akun">
                <FaUserEdit />
                <span>Update Akun</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout} tooltip="Log Out">
              <FaSignOutAlt />
              <span>Log Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export default UserSidebar;
