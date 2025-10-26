"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { UserRowData } from "./columns";
import { User, Mail, Shield, Hash, Calendar, Clock, Phone } from "lucide-react";

interface ViewCustomerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customer: UserRowData | null;
}

export function ViewCustomerDialog({
  open,
  onOpenChange,
  customer,
}: ViewCustomerDialogProps) {
  if (!customer) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Detail Customer</DialogTitle>
          <DialogDescription>
            Informasi lengkap tentang customer
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
              <p className="font-medium text-gray-900">{customer.name}</p>
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
                {customer.email}
              </p>
            </div>
          </div>

          <Separator />

          {/* Phone */}
          {customer.phone && (
            <>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-indigo-50 rounded-lg">
                  <Phone className="h-5 w-5 text-indigo-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500 mb-1">No. Telepon</p>
                  <p className="font-medium text-gray-900">{customer.phone}</p>
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* Role */}
          <div className="flex items-start gap-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Shield className="h-5 w-5 text-purple-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-1">Role</p>
              <p className="font-medium text-gray-900 capitalize">
                {customer.role}
              </p>
            </div>
          </div>

          <Separator />

          {/* User ID */}
          <div className="flex items-start gap-3">
            <div className="p-2 bg-orange-50 rounded-lg">
              <Hash className="h-5 w-5 text-orange-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-1">User ID</p>
              <p className="font-medium text-gray-900 font-mono text-sm break-all">
                {customer.userId}
              </p>
            </div>
          </div>

          <Separator />

          {/* Dibuat Pada */}
          <div className="flex items-start gap-3">
            <div className="p-2 bg-cyan-50 rounded-lg">
              <Calendar className="h-5 w-5 text-cyan-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-1">Dibuat Pada</p>
              <p className="font-medium text-gray-900">
                {new Date(customer.createdAt).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>

          <Separator />

          {/* Diupdate Pada */}
          <div className="flex items-start gap-3">
            <div className="p-2 bg-pink-50 rounded-lg">
              <Clock className="h-5 w-5 text-pink-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-1">Diupdate Pada</p>
              <p className="font-medium text-gray-900">
                {new Date(customer.updatedAt).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
