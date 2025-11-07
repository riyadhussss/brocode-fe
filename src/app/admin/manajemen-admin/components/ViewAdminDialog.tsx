"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { GetAdminsResponse } from "@/app/lib/types/admin";
import { User, Mail } from "lucide-react";

type AdminRowData = GetAdminsResponse["data"][number];

interface ViewAdminDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  admin: AdminRowData | null;
}

export function ViewAdminDialog({
  open,
  onOpenChange,
  admin,
}: ViewAdminDialogProps) {
  if (!admin) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Detail Administrator</DialogTitle>
          <DialogDescription>
            Informasi lengkap tentang administrator
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Nama */}
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <User className="h-5 w-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-1">Nama Lengkap</p>
              <p className="font-medium text-gray-900">{admin.name}</p>
            </div>
          </div>

          <Separator />

          {/* Email */}
          <div className="flex items-start gap-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <Mail className="h-5 w-5 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-1">Email</p>
              <p className="font-medium text-gray-900 break-all">
                {admin.email}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
