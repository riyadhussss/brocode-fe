"use client";

import { User, LogOut } from "lucide-react";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { authService } from "@/app/lib/services/auth.service";
import { toast } from "sonner";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function NavFooter() {
  const router = useRouter();
  const pathname = usePathname();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Check if current path is profile
  const isProfileActive = pathname === "/admin/profile";

  const handleLogout = async () => {
    try {
      // Tutup dialog
      setIsDialogOpen(false);

      // Hapus token dari localStorage
      await authService.logout();

      // Tampilkan notifikasi sukses
      toast.success("Berhasil logout", {
        description: "Anda telah keluar dari akun.",
        duration: 2000,
      });

      // Redirect ke halaman login
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Gagal logout", {
        description: "Terjadi kesalahan saat logout.",
      });
    }
  };

  return (
    <SidebarGroup className="mt-auto pb-4 pl-0 pr-0">
      <Separator className="my-2 bg-gray-700" />
      <SidebarMenu>
        {/* Update Profile */}
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            tooltip="Profile"
            isActive={isProfileActive}
            className="
              text-white transition-colors
              hover:bg-gray-700 hover:text-white
              data-[active=true]:bg-[#FDFB03]
              data-[active=true]:text-black
              data-[active=true]:font-semibold
            "
          >
            <Link href="/admin/profile">
              <User />
              <span>Profile</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        {/* Logout dengan konfirmasi */}
        <SidebarMenuItem>
          <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <AlertDialogTrigger asChild>
              <SidebarMenuButton
                tooltip="Log Out"
                className="
                  text-white hover:bg-red-700 hover:text-white
                  active:bg-red-700 transition-colors cursor-pointer
                "
                onClick={() => setIsDialogOpen(true)}
              >
                <LogOut />
                <span>Log Out</span>
              </SidebarMenuButton>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white border border-gray-200 text-black max-w-md">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-gray-900 text-xl font-semibold">
                  Konfirmasi Logout
                </AlertDialogTitle>
                <AlertDialogDescription className="text-gray-600">
                  Apakah Anda yakin ingin keluar dari akun Anda? Anda akan
                  diarahkan ke halaman login.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel
                  className="bg-gray-100 text-gray-900 hover:bg-gray-200 border-gray-300"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Batal
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Ya, Logout
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
