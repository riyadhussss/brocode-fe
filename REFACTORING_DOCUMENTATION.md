# Refactoring Manajemen Pages - Documentation

Dokumentasi lengkap untuk refactoring semua halaman manajemen (Admin, Capster, Kasir, Layanan, dan User) dengan struktur komponen yang terorganisir dan penamaan yang konsisten.

---

## 📋 Overview

Semua halaman manajemen telah direfactor dengan tujuan:

- ✅ **Better Code Organization**: Semua komponen UI dalam folder `components/`
- ✅ **Consistent Naming**: PascalCase dengan prefix entity (Admin, Capster, Kasir, dll)
- ✅ **Reusability**: Komponen dapat digunakan kembali
- ✅ **Maintainability**: Mudah mencari dan mengedit komponen
- ✅ **Single Import**: Import semua dari `./components`
- ✅ **Separation of Concerns**: Logic di page, UI di components

---

## 🎯 Struktur Refactoring

### Pattern yang Digunakan

Semua folder mengikuti pattern yang sama:

```
manajemen-{entity}/
├── page.tsx                      # Main logic & orchestration
└── components/
    ├── {Entity}PageHeader.tsx    # Header dengan refresh button
    ├── {Entity}TableSkeleton.tsx # Loading skeleton
    ├── {Entity}TableColumns.tsx  # Definisi kolom tabel
    ├── {Entity}DataTable.tsx     # DataTable component
    ├── Add{Entity}Dialog.tsx     # Dialog tambah
    ├── View{Entity}Dialog.tsx    # Dialog lihat detail
    ├── Edit{Entity}Dialog.tsx    # Dialog edit
    ├── Delete{Entity}Dialog.tsx  # Dialog hapus
    ├── index.ts                  # Barrel export
    └── README.md (optional)      # Dokumentasi khusus
```

---

## 1️⃣ Manajemen Admin

### 📁 Struktur File

```
manajemen-admin/
├── page.tsx (195 lines)
└── components/
    ├── AdminPageHeader.tsx
    ├── AdminTableSkeleton.tsx
    ├── AdminTableColumns.tsx
    ├── AdminDataTable.tsx
    ├── AddAdminDialog.tsx
    ├── ViewAdminDialog.tsx
    ├── EditAdminDialog.tsx
    ├── DeleteAdminDialog.tsx
    ├── index.ts
    └── README.md
```

### 📊 Stats

- **Before**: 277 lines dalam satu file
- **After**: 195 lines di page.tsx (30% reduction)
- **Components**: 8 komponen + index.ts + README.md

### 💻 Import Example

```tsx
import {
  AdminPageHeader,
  AdminTableSkeleton,
  AdminDataTable,
  createColumns,
  AddAdminDialog,
  ViewAdminDialog,
  EditAdminDialog,
  DeleteAdminDialog,
} from "./components";
```

---

## 2️⃣ Manajemen Capster

### 📁 Struktur File

```
manajemen-capster/
├── page.tsx
└── components/
    ├── CapsterPageHeader.tsx
    ├── CapsterTableSkeleton.tsx
    ├── CapsterStats.tsx         # ✨ Stats cards component
    ├── CapsterTableColumns.tsx
    ├── CapsterDataTable.tsx
    ├── AddCapsterDialog.tsx
    ├── ViewCapsterDialog.tsx
    ├── EditCapsterDialog.tsx
    ├── DeleteCapsterDialog.tsx
    └── index.ts
```

### 📊 Stats

- **Components**: 10 komponen (termasuk CapsterStats)
- **Special**: Memiliki komponen CapsterStats untuk menampilkan:
  - Total Capster
  - Capster Aktif (hijau)
  - Capster Tidak Aktif (merah)

### 💻 Import Example

```tsx
import {
  CapsterPageHeader,
  CapsterTableSkeleton,
  CapsterStats,
  CapsterDataTable,
  createColumns,
  AddCapsterDialog,
  ViewCapsterDialog,
  EditCapsterDialog,
  DeleteCapsterDialog,
} from "./components";
```

---

## 3️⃣ Manajemen Kasir

### 📁 Struktur File

```
manajemen-kasir/
├── page.tsx
└── components/
    ├── KasirPageHeader.tsx
    ├── KasirTableSkeleton.tsx
    ├── KasirTableColumns.tsx
    ├── KasirDataTable.tsx
    ├── AddKasirDialog.tsx
    ├── ViewKasirDialog.tsx
    ├── EditKasirDialog.tsx
    ├── DeleteKasirDialog.tsx
    └── index.ts
```

### 📊 Stats

- **Components**: 8 komponen + index.ts

### 💻 Import Example

```tsx
import {
  KasirPageHeader,
  KasirTableSkeleton,
  KasirDataTable,
  createColumns,
  AddKasirDialog,
  ViewKasirDialog,
  EditKasirDialog,
  DeleteKasirDialog,
} from "./components";
```

---

## 4️⃣ Manajemen Layanan

### 📁 Struktur File

```
manajemen-layanan/
├── page.tsx
└── components/
    ├── LayananPageHeader.tsx
    ├── LayananTableSkeleton.tsx
    ├── LayananTableColumns.tsx
    ├── LayananDataTable.tsx
    ├── AddLayananDialog.tsx
    ├── ViewLayananDialog.tsx
    ├── EditLayananDialog.tsx
    ├── DeleteLayananDialog.tsx
    └── index.ts
```

### 📊 Stats

- **Components**: 8 komponen + index.ts

### 💻 Import Example

```tsx
import {
  LayananPageHeader,
  LayananTableSkeleton,
  LayananDataTable,
  createColumns,
  AddLayananDialog,
  ViewLayananDialog,
  EditLayananDialog,
  DeleteLayananDialog,
} from "./components";
```

---

## 5️⃣ Manajemen User (Customer)

### 📁 Struktur File

```
manajemen-user/
├── page.tsx
└── components/
    ├── CustomerPageHeader.tsx
    ├── CustomerTableSkeleton.tsx
    ├── CustomerTableColumns.tsx
    ├── CustomerDataTable.tsx
    ├── AddCustomerDialog.tsx
    ├── ViewCustomerDialog.tsx
    ├── EditCustomerDialog.tsx
    ├── DeleteCustomerDialog.tsx
    └── index.ts
```

### 📊 Stats

- **Components**: 8 komponen + index.ts
- **Note**: Menggunakan "Customer" sebagai prefix (bukan "User")

### 💻 Import Example

```tsx
import {
  CustomerPageHeader,
  CustomerTableSkeleton,
  CustomerDataTable,
  createColumns,
  AddCustomerDialog,
  ViewCustomerDialog,
  EditCustomerDialog,
  DeleteCustomerDialog,
} from "./components";
```

---

## 🧩 Komponen Detail

### 1. PageHeader Component

**Purpose**: Header halaman dengan judul, deskripsi, dan tombol refresh

**Props**:

```tsx
interface PageHeaderProps {
  loading?: boolean;
  onRefresh: () => void;
}
```

**Usage**:

```tsx
<AdminPageHeader loading={loading} onRefresh={handleRefresh} />
```

---

### 2. TableSkeleton Component

**Purpose**: Loading skeleton untuk search bar, tabel, dan pagination

**Props**: Tidak ada props (pure UI component)

**Usage**:

```tsx
{
  loading ? <AdminTableSkeleton /> : <AdminDataTable {...props} />;
}
```

---

### 3. TableColumns

**Purpose**: Definisi kolom tabel menggunakan TanStack Table

**Export**:

```tsx
export const createColumns = (callbacks?: Callbacks) => ColumnDef[]
```

**Callbacks**:

- `onView?: (data) => void`
- `onEdit?: (data) => void`
- `onDelete?: (data) => void`

**Usage**:

```tsx
const columns = useMemo(
  () =>
    createColumns({
      onView: handleView,
      onEdit: handleEdit,
      onDelete: handleDelete,
    }),
  []
);
```

---

### 4. DataTable Component

**Purpose**: Tabel generic dengan search, filter, sorting, pagination

**Props**:

```tsx
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onAddNew?: () => void;
}
```

**Features**:

- ✅ Search by nama
- ✅ Column sorting
- ✅ Pagination
- ✅ Column visibility toggle
- ✅ Rows per page selector
- ✅ Empty state handling

**Usage**:

```tsx
<AdminDataTable columns={columns} data={data} onAddNew={handleAddNew} />
```

---

### 5. Dialog Components (Add/View/Edit/Delete)

**Add Dialog Props**:

```tsx
interface AddDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}
```

**View Dialog Props**:

```tsx
interface ViewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: EntityType | null;
}
```

**Edit Dialog Props**:

```tsx
interface EditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: EntityType | null;
  onSuccess: () => void;
}
```

**Delete Dialog Props**:

```tsx
interface DeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void | Promise<void>;
  entityName: string;
  loading: boolean;
}
```

---

## 📝 Naming Convention

### Komponen

| Entity        | Prefix   | Example                               |
| ------------- | -------- | ------------------------------------- |
| Admin         | Admin    | AdminPageHeader, AdminDataTable       |
| Capster       | Capster  | CapsterPageHeader, CapsterStats       |
| Kasir         | Kasir    | KasirPageHeader, KasirDataTable       |
| Layanan       | Layanan  | LayananPageHeader, LayananDataTable   |
| User/Customer | Customer | CustomerPageHeader, CustomerDataTable |

### File Naming

- ✅ **PascalCase**: `AdminPageHeader.tsx`
- ✅ **Descriptive**: `CustomerTableSkeleton.tsx`
- ✅ **Consistent Suffix**: `...Dialog.tsx`, `...Header.tsx`, `...Skeleton.tsx`

### Export Naming

```tsx
// index.ts
export { AdminPageHeader } from "./AdminPageHeader";
export { DataTable as AdminDataTable } from "./AdminDataTable";
export { createColumns } from "./AdminTableColumns";
```

---

## 🔄 Migration Benefits

### Before Refactoring

```
❌ Files scattered in root folder
❌ Inconsistent naming (kebab-case vs PascalCase)
❌ Large page files (250-320 lines)
❌ Repetitive skeleton code
❌ Hard to find related components
❌ No clear separation of concerns
```

### After Refactoring

```
✅ All components in components/ folder
✅ Consistent PascalCase naming with entity prefix
✅ Smaller page files (195-250 lines, ~20-30% reduction)
✅ Reusable skeleton components
✅ Easy to locate and maintain
✅ Clear separation: logic in page, UI in components
✅ Single import point via index.ts
✅ Better scalability
```

---

## 🚀 Usage Pattern

### Standard Page Structure

```tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { toast } from "sonner";
import {
  EntityPageHeader,
  EntityTableSkeleton,
  EntityDataTable,
  createColumns,
  AddEntityDialog,
  ViewEntityDialog,
  EditEntityDialog,
  DeleteEntityDialog,
} from "./components";
import { entityService } from "@/app/lib/services/entity.service";
import { getErrorMessage } from "@/app/lib/getErrorMessage";

export default function ManajemenEntity() {
  // State management
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogs, setDialogs] = useState({
    add: false,
    view: { open: false, data: null },
    edit: { open: false, data: null },
    delete: { open: false, data: null, loading: false },
  });

  // Fetch data
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await entityService.getAll();
      setData(response.data);
      toast.success("Data berhasil dimuat");
    } catch (error) {
      toast.error("Gagal memuat data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handlers
  const handleRefresh = () => fetchData();
  const handleAddNew = () => setDialogs((prev) => ({ ...prev, add: true }));
  const handleView = (item) =>
    setDialogs((prev) => ({ ...prev, view: { open: true, data: item } }));
  const handleEdit = (item) =>
    setDialogs((prev) => ({ ...prev, edit: { open: true, data: item } }));
  const handleDelete = (item) =>
    setDialogs((prev) => ({
      ...prev,
      delete: { open: true, data: item, loading: false },
    }));

  // Create columns
  const columns = useMemo(
    () =>
      createColumns({
        onView: handleView,
        onEdit: handleEdit,
        onDelete: handleDelete,
      }),
    []
  );

  return (
    <div className="h-full bg-gray-50 p-6 flex flex-col">
      <EntityPageHeader loading={loading} onRefresh={handleRefresh} />

      <div className="flex-1 flex flex-col min-h-0">
        <Card className="flex-1 flex flex-col">
          <CardHeader>
            <CardTitle>Daftar Entity</CardTitle>
            <CardDescription>Deskripsi halaman</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col min-h-0">
            {loading ? (
              <EntityTableSkeleton />
            ) : (
              <EntityDataTable
                columns={columns}
                data={data}
                onAddNew={handleAddNew}
              />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Dialogs */}
      <AddEntityDialog {...addProps} />
      <ViewEntityDialog {...viewProps} />
      <EditEntityDialog {...editProps} />
      <DeleteEntityDialog {...deleteProps} />
    </div>
  );
}
```

---

## 🎨 Best Practices

### 1. Component Organization

- Semua komponen UI dalam folder `components/`
- File logic (services, types) tetap di folder `lib/`
- Page hanya orchestrate, tidak ada UI code

### 2. Naming

- PascalCase untuk React components
- Prefix dengan entity name untuk clarity
- Consistent suffix: Dialog, Header, Skeleton, Table

### 3. Import

- Gunakan barrel export (`index.ts`)
- Single import statement untuk semua components
- Type imports terpisah jika perlu

### 4. State Management

- State tetap di page level
- Props drilling untuk komponen
- Callback functions untuk actions

### 5. Error Handling

- Try-catch di fetch functions
- Toast notifications untuk user feedback
- Error messages dari `getErrorMessage` helper

---

## ✅ Checklist untuk Page Baru

Saat membuat halaman manajemen baru, ikuti checklist ini:

- [ ] Buat folder `components/` di dalam folder page
- [ ] Buat `{Entity}PageHeader.tsx` dengan refresh button
- [ ] Buat `{Entity}TableSkeleton.tsx` untuk loading state
- [ ] Pindahkan dan rename `columns.tsx` → `{Entity}TableColumns.tsx`
- [ ] Pindahkan dan rename `data-table.tsx` → `{Entity}DataTable.tsx`
- [ ] Pindahkan dan rename semua dialog files dengan prefix entity
- [ ] Buat `index.ts` dengan barrel exports
- [ ] Update `page.tsx` untuk import dari `./components`
- [ ] Refactor JSX di page.tsx menggunakan komponen baru
- [ ] Test semua functionality (CRUD operations)
- [ ] Verify no compilation errors
- [ ] (Optional) Buat `README.md` untuk dokumentasi khusus

---

## 6️⃣ Profile Admin

### 📁 Struktur File

```
admin/profile/
├── page.tsx (258 lines, reduced from 480 lines - 46% reduction)
└── components/
    ├── ProfilePageHeader.tsx
    ├── ProfileFormSkeleton.tsx
    ├── ProfileInfoForm.tsx
    ├── PasswordSection.tsx
    ├── index.ts
    └── README.md
```

### 📊 Stats

- **Before**: 480 lines dalam satu file
- **After**: 258 lines (46% reduction)
- **Components**: 4 komponen + index.ts + README.md
- **Type**: Form page (bukan table management)

### 💻 Import Example

```tsx
import {
  ProfilePageHeader,
  ProfileFormSkeleton,
  ProfileInfoForm,
  PasswordSection,
} from "./components";
```

### 🧩 Components Detail

- **ProfilePageHeader**: Header dengan ShieldCheck icon + deskripsi
- **ProfileFormSkeleton**: Loading skeleton untuk seluruh form
- **ProfileInfoForm**: Input Nama & Email dengan icon User/Mail
- **PasswordSection**: 3 password fields dengan toggle visibility (internal state)

---

## 7️⃣ Profile Kasir

### 📁 Struktur File

```
kasir/profile/
├── page.tsx (256 lines, reduced from 458 lines - 44% reduction)
└── components/
    ├── ProfilePageHeader.tsx (shared)
    ├── ProfileFormSkeleton.tsx (shared)
    ├── ProfileInfoForm.tsx (shared)
    ├── PasswordSection.tsx (shared)
    ├── index.ts
    └── README.md
```

### 📊 Stats

- **Before**: 458 lines dengan custom CSS + react-icons/fa
- **After**: 256 lines dengan shadcn components (44% reduction)
- **Components**: 4 komponen shared dengan Admin + index.ts + README.md
- **Style Migration**: Custom CSS → Shadcn/UI

### 🎨 Style Unification

**Before (Custom):**

```tsx
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
<div className="bg-white rounded-xl shadow-sm border border-gray-100">
  <div className="relative">
    <FaUser className="text-gray-400" size={16} />
    <input className="w-full pl-10 pr-4 py-3..." />
  </div>
</div>;
```

**After (Shadcn):**

```tsx
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Card, Input, Label, Button } from "@/components/ui/...";
<Card>
  <CardContent>
    <ProfileInfoForm formData={formData} onInputChange={handleInputChange} />
  </CardContent>
</Card>;
```

### ✨ Benefits

- ✅ Konsisten dengan Admin Profile
- ✅ Shared components (DRY principle)
- ✅ Unified design system (shadcn/ui)
- ✅ Same icon library (lucide-react)

---

## 📚 Summary

### Total Pages Refactored: 7

1. ✅ Manajemen Admin (195 lines, 10 files)
2. ✅ Manajemen Capster (dengan stats, 10 files)
3. ✅ Manajemen Kasir (8 files)
4. ✅ Manajemen Layanan (8 files)
5. ✅ Manajemen User/Customer (8 files)
6. ✅ **Profile Admin** (258 lines, 5 files, 46% reduction)
7. ✅ **Profile Kasir** (256 lines, 5 files, 44% reduction) - **Style unified with shadcn**

### Total Components Created: ~50+

- 5 PageHeader components (management pages)
- 5 TableSkeleton components
- 5 TableColumns files
- 5 DataTable files
- 20 Dialog components (4 per entity)
- 1 CapsterStats component
- 5 index.ts files (management pages)
- **Profile Components** (shared):
  - 1 ProfilePageHeader
  - 1 ProfileFormSkeleton
  - 1 ProfileInfoForm
  - 1 PasswordSection
  - 2 index.ts files

### Code Reduction

- Average 20-30% reduction in page.tsx file size for management pages
- **46% reduction** for Admin Profile (480 → 258 lines)
- **44% reduction** for Kasir Profile (458 → 256 lines)
- Better organization and maintainability
- Improved developer experience
- Easier to scale and add new features
- **Consistent styling** across all pages (shadcn/ui)

### Style Unification Achievement

- **Before**: Kasir Profile used custom CSS with `react-icons/fa` (FaUser, FaEnvelope, FaLock, etc.)
- **After**: Both Admin and Kasir use `shadcn/ui` components with `lucide-react` icons
- **Shared Components**: ProfilePageHeader, ProfileFormSkeleton, ProfileInfoForm, PasswordSection
- **Consistency**: Same design language throughout Admin and Kasir sections
- **Maintainability**: Update once, applies to both roles

---

**Created**: November 7, 2025  
**Last Updated**: November 7, 2025  
**Version**: 1.1.0 - Added Profile Pages (Admin & Kasir) with Style Unification
