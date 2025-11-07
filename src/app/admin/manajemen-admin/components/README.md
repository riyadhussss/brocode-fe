# Manajemen Admin Components

Komponen-komponen untuk halaman Manajemen Admin yang sudah direfactor untuk memudahkan maintenance dan reusability.

## 📁 Struktur Komponen

```
components/
├── AdminPageHeader.tsx       # Header halaman dengan tombol refresh
├── AdminTableSkeleton.tsx    # Loading skeleton untuk tabel
├── AdminTableColumns.tsx     # Definisi kolom tabel
├── AdminDataTable.tsx        # Komponen DataTable dengan fitur lengkap
├── AddAdminDialog.tsx        # Dialog tambah admin baru
├── ViewAdminDialog.tsx       # Dialog lihat detail admin
├── EditAdminDialog.tsx       # Dialog edit data admin
├── DeleteAdminDialog.tsx     # Dialog konfirmasi hapus admin
├── index.ts                  # Export barrel file
└── README.md                 # Dokumentasi
```

## 🧩 Komponen

### 1. AdminPageHeader

Komponen header halaman dengan judul, deskripsi, dan tombol refresh.

**Props:**

- `loading` (boolean, optional) - Status loading, default: false
- `onRefresh` (() => void) - Callback function saat tombol refresh diklik

**Features:**

- ✅ Tombol refresh dengan icon spinning saat loading
- ✅ Responsive layout
- ✅ Consistent styling dengan page lain

**Contoh Penggunaan:**

```tsx
<AdminPageHeader loading={loading} onRefresh={handleRefresh} />
```

---

### 2. AdminTableSkeleton

Komponen loading skeleton untuk tabel dengan search bar dan pagination.

**Props:** Tidak ada props

**Features:**

- ✅ Skeleton untuk search bar
- ✅ Skeleton untuk action buttons
- ✅ Skeleton untuk table rows (6 rows)
- ✅ Skeleton untuk pagination
- ✅ Smooth loading animation

**Contoh Penggunaan:**

```tsx
{
  loading ? (
    <AdminTableSkeleton />
  ) : (
    <DataTable columns={columns} data={data} />
  );
}
```

---

### 3. AdminTableColumns

Definisi kolom untuk tabel administrator menggunakan TanStack Table.

**Export:**

- `createColumns(callbacks?: AdminActionsCallbacks)` - Function untuk membuat array kolom

**Callbacks:**

- `onView` - Callback saat tombol View diklik
- `onEdit` - Callback saat tombol Edit diklik
- `onDelete` - Callback saat tombol Delete diklik

**Features:**

- ✅ Kolom Nomor (auto increment)
- ✅ Kolom Nama dengan bold text
- ✅ Kolom Email dengan gray color
- ✅ Kolom No. HP dengan format display
- ✅ Kolom Actions dengan dropdown menu (View, Edit, Delete)
- ✅ Type-safe dengan TypeScript

**Contoh Penggunaan:**

```tsx
const columns = useMemo(
  () =>
    createColumns({
      onView: handleViewClick,
      onEdit: handleEditClick,
      onDelete: handleDeleteClick,
    }),
  []
);
```

---

### 4. AdminDataTable

Komponen tabel generic dengan fitur search, filter, sorting, dan pagination.

**Props:**

- `columns` (ColumnDef[]) - Array definisi kolom dari createColumns
- `data` (TData[]) - Array data yang akan ditampilkan
- `onAddNew` (() => void, optional) - Callback untuk tombol tambah data baru

**Features:**

- ✅ Search by nama admin
- ✅ Sorting untuk setiap kolom
- ✅ Pagination dengan navigasi
- ✅ Column visibility toggle
- ✅ Rows per page selector (10, 20, 30, 40, 50)
- ✅ Responsive table layout
- ✅ Empty state handling
- ✅ Type-safe generic component

**Contoh Penggunaan:**

```tsx
<AdminDataTable columns={columns} data={adminsList} onAddNew={handleAddNew} />
```

---

### 5. AddAdminDialog

Dialog untuk menambah administrator baru.

**Props:**

- `open` (boolean) - Status dialog terbuka/tertutup
- `onOpenChange` ((open: boolean) => void) - Callback saat status dialog berubah
- `onSuccess` (() => void) - Callback saat berhasil menambah admin

**Features:**

- ✅ Form validation
- ✅ Loading state saat submit
- ✅ Error handling
- ✅ Toast notification
- ✅ Auto refresh data setelah sukses

**Contoh Penggunaan:**

```tsx
<AddAdminDialog
  open={showAddDialog}
  onOpenChange={setShowAddDialog}
  onSuccess={handleAddSuccess}
/>
```

---

### 6. ViewAdminDialog

Dialog untuk melihat detail administrator.

**Props:**

- `open` (boolean) - Status dialog terbuka/tertutup
- `onOpenChange` ((open: boolean) => void) - Callback saat status dialog berubah
- `admin` (Admin | null) - Data admin yang akan ditampilkan

**Features:**

- ✅ Menampilkan semua detail admin
- ✅ Read-only view
- ✅ Formatted data display
- ✅ Responsive layout

**Contoh Penggunaan:**

```tsx
<ViewAdminDialog
  open={viewDialog.open}
  onOpenChange={(open) => setViewDialog((prev) => ({ ...prev, open }))}
  admin={viewDialog.admin}
/>
```

---

### 7. EditAdminDialog

Dialog untuk edit data administrator.

**Props:**

- `open` (boolean) - Status dialog terbuka/tertutup
- `onOpenChange` ((open: boolean) => void) - Callback saat status dialog berubah
- `admin` (Admin | null) - Data admin yang akan diedit
- `onSuccess` (() => void) - Callback saat berhasil update admin

**Features:**

- ✅ Pre-filled form dengan data existing
- ✅ Form validation
- ✅ Loading state saat submit
- ✅ Error handling
- ✅ Toast notification
- ✅ Auto refresh data setelah sukses

**Contoh Penggunaan:**

```tsx
<EditAdminDialog
  open={editDialog.open}
  onOpenChange={(open) => setEditDialog((prev) => ({ ...prev, open }))}
  admin={editDialog.admin}
  onSuccess={handleEditSuccess}
/>
```

---

### 8. DeleteAdminDialog

Dialog konfirmasi untuk menghapus administrator.

**Props:**

- `open` (boolean) - Status dialog terbuka/tertutup
- `onOpenChange` ((open: boolean) => void) - Callback saat status dialog berubah
- `onConfirm` (() => void | Promise<void>) - Callback saat konfirmasi hapus
- `adminName` (string) - Nama admin yang akan dihapus
- `loading` (boolean) - Status loading saat proses hapus

**Features:**

- ✅ Konfirmasi sebelum hapus
- ✅ Menampilkan nama admin yang akan dihapus
- ✅ Loading state saat proses delete
- ✅ Error handling
- ✅ Toast notification
- ✅ Auto refresh data setelah sukses

**Contoh Penggunaan:**

```tsx
<DeleteAdminDialog
  open={deleteDialog.open}
  onOpenChange={(open) => setDeleteDialog((prev) => ({ ...prev, open }))}
  onConfirm={handleDeleteConfirm}
  adminName={deleteDialog.admin?.name || ""}
  loading={deleteDialog.loading}
/>
```

---

## 🔄 Refactoring Benefits

### Sebelum (277 lines)

```tsx
// ❌ Semua UI dan logic dalam satu file
// ❌ Header, skeleton, dialogs di page.tsx
// ❌ Sulit maintenance
// ❌ Tidak reusable
```

### Sesudah (232 lines di page.tsx + komponen terpisah)

```tsx
// ✅ Komponen terpisah di folder components/
// ✅ Logic tetap di page, UI di komponen
// ✅ Mudah maintenance
// ✅ Komponen reusable
// ✅ Better code organization
```

**Pengurangan Kode:**

- Main page: 277 → 232 lines (16% reduction)
- Better separation of concerns
- Penamaan konsisten dengan PascalCase

---

## 📦 File Structure Changes

### Sebelum:

```
manajemen-admin/
├── page.tsx
├── columns.tsx
├── data-table.tsx
├── add-admin-dialog.tsx
├── view-admin-dialog.tsx
├── edit-admin-dialog.tsx
└── delete-admin-dialog.tsx
```

### Sesudah:

```
manajemen-admin/
├── page.tsx
├── columns.tsx
├── data-table.tsx
└── components/
    ├── AdminPageHeader.tsx
    ├── AdminTableSkeleton.tsx
    ├── AddAdminDialog.tsx
    ├── ViewAdminDialog.tsx
    ├── EditAdminDialog.tsx
    ├── DeleteAdminDialog.tsx
    └── index.ts
```

**Keuntungan:**

- ✅ File terorganisir dalam folder components/
- ✅ Penamaan konsisten (PascalCase)
- ✅ Single import point via index.ts
- ✅ Mudah dicari dan di-maintain

---

## 🚀 Usage di Page

````tsx
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

export default function ManajemenAdmin() {
  // State management...

  // Create columns with callbacks
  const columns = useMemo(
    () => createColumns({
      onView: handleViewClick,
      onEdit: handleEditClick,
      onDelete: handleDeleteClick,
    }),
    []
  );

  return (
    <div className="h-full bg-gray-50 p-6 flex flex-col">
      {/* Header */}
      <AdminPageHeader loading={loading} onRefresh={handleRefresh} />

      {/* Table */}
      <Card>
        <CardContent>
          {loading ? (
            <AdminTableSkeleton />
          ) : (
            <AdminDataTable
              columns={columns}
              data={data}
              onAddNew={handleAddNew}
            />
          )}
        </CardContent>
      </Card>

      {/* Dialogs */}
      <AddAdminDialog {...props} />
      <ViewAdminDialog {...props} />
      <EditAdminDialog {...props} />
      <DeleteAdminDialog {...props} />
    </div>
  );
}
```---

## 🔧 Maintenance Guide

### Mengubah Header:

Edit `AdminPageHeader.tsx`:

```tsx
// Tambah tombol baru
<div className="flex gap-2">
  <Button onClick={onRefresh}>Refresh</Button>
  <Button onClick={onExport}>Export</Button>
</div>
````

### Mengubah Skeleton:

Edit `AdminTableSkeleton.tsx`:

```tsx
// Ubah jumlah skeleton rows
{
  Array.from({ length: 10 }).map((_, i) => (
    <div key={i} className="h-12 w-full bg-gray-200 rounded animate-pulse" />
  ));
}
```

### Menambah Field di Dialog:

Edit dialog yang sesuai (Add/Edit):

```tsx
// Tambah field baru
<Field label="Role">
  <Input name="role" value={formData.role} onChange={handleChange} />
</Field>
```

---

## 📝 Type Definitions

```typescript
// AdminPageHeader Props
interface AdminPageHeaderProps {
  loading?: boolean;
  onRefresh: () => void;
}

// Dialog Props (Base)
interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// AddAdminDialog Props
interface AddAdminDialogProps extends DialogProps {
  onSuccess: () => void;
}

// ViewAdminDialog Props
interface ViewAdminDialogProps extends DialogProps {
  admin: Admin | null;
}

// EditAdminDialog Props
interface EditAdminDialogProps extends DialogProps {
  admin: Admin | null;
  onSuccess: () => void;
}

// DeleteAdminDialog Props
interface DeleteAdminDialogProps extends DialogProps {
  onConfirm: () => void | Promise<void>;
  adminName: string;
  loading: boolean;
}
```

---

## ✅ Best Practices

1. **Component Organization**: Semua komponen UI di folder components/
2. **Naming Convention**: PascalCase untuk file komponen React
3. **Single Export Point**: Gunakan index.ts untuk barrel export
4. **Separation of Concerns**: Logic di page, UI di komponen
5. **Reusability**: Skeleton dan Header bisa dipakai di page lain
6. **Type Safety**: TypeScript interfaces untuk semua props
7. **Consistent Styling**: Menggunakan shadcn/ui dan Tailwind
8. **Loading States**: Skeleton dan spinner untuk UX yang baik

---

Created: November 7, 2025
