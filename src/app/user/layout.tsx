"use client";

import { usePathname } from "next/navigation";
import { AppSidebar } from "@/components/user/sidebar/app-sidebar";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

function UserLayoutContent({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <SidebarInset className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-2 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              {/* Statis, tidak memiliki href */}
              <BreadcrumbItem>
                <BreadcrumbPage>User</BreadcrumbPage>
              </BreadcrumbItem>

              <BreadcrumbSeparator />

              {/* Dinamis berdasarkan route */}
              <BreadcrumbItem>
                <BreadcrumbPage>{title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <main className="flex-1 min-h-0">{children}</main>
    </SidebarInset>
  );
}

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const lastSegment = pathname.split("/").filter(Boolean).pop() || "dashboard";

  // Ubah ke format title-case
  const title = lastSegment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <SidebarProvider>
      <AppSidebar />
      <UserLayoutContent title={title}>{children}</UserLayoutContent>
    </SidebarProvider>
  );
}
