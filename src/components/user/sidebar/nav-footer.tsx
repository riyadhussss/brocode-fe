"use client";

import { User, LogOut } from "lucide-react";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

export function NavFooter() {
  return (
    <SidebarGroup className="mt-auto pb-4 pl-0 pr-0">
      <Separator className="my-2 bg-gray-700" />
      <SidebarMenu>
        {/* Update Profile */}
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            tooltip="Update Profile"
            className="
                text-white transition-colors
                hover:bg-gray-700 hover:text-white
                data-[active=true]:bg-[#FDFB03]
                data-[active=true]:text-black
                data-[active=true]:font-semibold
              "
          >
            <a href="/user/update-akun">
              <User />
              <span>Update Profile</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>

        {/* Log Out */}
        <SidebarMenuItem>
          <SidebarMenuButton
            tooltip="Log Out"
            className="
              text-white hover:bg-red-700 hover:text-white
              active:bg-red-700 transition-colors cursor-pointer
            "
            onClick={() => {
              console.log("Logout clicked"); // Placeholder — nanti diganti dengan fungsi logout
            }}
          >
            <LogOut />
            <span>Log Out</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
