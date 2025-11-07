# Profile Components

Komponen-komponen untuk halaman Profile Admin yang telah direfactor untuk kemudahan maintenance.

## 📁 Struktur Komponen

```
profile/
├── page.tsx (269 lines, reduced from 480 lines - 44% reduction)
└── components/
    ├── ProfilePageHeader.tsx
    ├── ProfileFormSkeleton.tsx
    ├── ProfileInfoForm.tsx
    ├── PasswordSection.tsx
    ├── ConfirmSaveDialog.tsx
    └── index.ts
```

## 📊 Refactoring Stats

- **Before**: 480 lines dalam satu file
- **After**: 269 lines (44% reduction)
- **Components**: 5 komponen + index.ts

## 🧩 Komponen

### 1. ProfilePageHeader

**File**: `ProfilePageHeader.tsx`

**Deskripsi**: Header halaman profil dengan icon dan deskripsi.

**Props**: Tidak ada (static component)

**Usage**:

```tsx
<ProfilePageHeader />
```

**Output**:

- Icon ShieldCheck (kuning)
- Judul "Profil"
- Deskripsi "Kelola informasi profil dan keamanan Anda"

---

### 2. ProfileFormSkeleton

**File**: `ProfileFormSkeleton.tsx`

**Deskripsi**: Loading skeleton untuk form profil.

**Props**: Tidak ada

**Usage**:

```tsx
{
  isLoadingData ? <ProfileFormSkeleton /> : <ActualForm />;
}
```

**Features**:

- Card wrapper
- Skeleton untuk header
- Skeleton untuk 2 input fields (Nama & Email)
- Skeleton untuk separator
- Skeleton untuk password section (3 fields)
- Skeleton untuk submit button

---

### 3. ProfileInfoForm

**File**: `ProfileInfoForm.tsx`

**Deskripsi**: Form untuk informasi dasar profil (Nama & Email).

**Props**:

```tsx
interface ProfileInfoFormProps {
  formData: {
    name: string;
    email: string;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
```

**Usage**:

```tsx
<ProfileInfoForm formData={formData} onInputChange={handleInputChange} />
```

**Features**:

- Input Nama Lengkap dengan icon User
- Input Email dengan icon Mail
- Validation: required fields
- Focus ring kuning (#FDFB03)

---

### 4. PasswordSection

**File**: `PasswordSection.tsx`

**Deskripsi**: Section untuk mengubah password dengan 3 input fields.

**Props**:

```tsx
interface PasswordSectionProps {
  formData: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
```

**Usage**:

```tsx
<PasswordSection formData={formData} onInputChange={handleInputChange} />
```

**Features**:

- Header "Ubah Password" dengan icon KeyRound
- Info text: "Kosongkan jika tidak ingin mengubah password"
- **3 Password Fields**:
  1. Password Saat Ini
  2. Password Baru
  3. Konfirmasi Password Baru
- **Toggle visibility** untuk setiap field (Eye/EyeOff icon)
- Internal state untuk show/hide password
- Focus ring kuning (#FDFB03)

**State Management**:

```tsx
const [showCurrentPassword, setShowCurrentPassword] = useState(false);
const [showNewPassword, setShowNewPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);
```

---

### 5. ConfirmSaveDialog

**File**: `ConfirmSaveDialog.tsx`

**Deskripsi**: Dialog konfirmasi sebelum menyimpan perubahan profil.

**Props**:

```tsx
interface ConfirmSaveDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isLoading: boolean;
}
```

**Usage**:

```tsx
const [showConfirmDialog, setShowConfirmDialog] = useState(false);

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (!validateForm()) return;
  setShowConfirmDialog(true); // Show dialog instead of direct save
};

const handleConfirmSave = async () => {
  // Actual save logic here
};

<ConfirmSaveDialog
  open={showConfirmDialog}
  onOpenChange={setShowConfirmDialog}
  onConfirm={handleConfirmSave}
  isLoading={isLoading}
/>;
```

**Features**:

- AlertDialog dari shadcn/ui
- Icon AlertTriangle (warning kuning)
- Judul: "Konfirmasi Perubahan"
- Pesan: "Apakah Anda yakin ingin mengubah profil?"
- Tombol "Batal" dan "Ya, Simpan"
- Loading state pada tombol konfirmasi
- Disable buttons saat loading

---

## 💻 Page Structure

### Import Pattern

```tsx
import {
  ProfilePageHeader,
  ProfileFormSkeleton,
  ProfileInfoForm,
  PasswordSection,
  ConfirmSaveDialog,
} from "./components";
```

### JSX Pattern

```tsx
const [showConfirmDialog, setShowConfirmDialog] = useState(false);

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (!validateForm()) return;
  setShowConfirmDialog(true);
};

const handleConfirmSave = async () => {
  // Save logic
};

<div className="h-full bg-gray-50 p-6 flex flex-col">
  <div className="max-w-3xl mx-auto w-full">
    <ProfilePageHeader />

    <div className="max-w-2xl mx-auto">
      {isLoadingData ? (
        <ProfileFormSkeleton />
      ) : (
        <Card>
          <CardHeader>...</CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <ProfileInfoForm {...props} />
              <Separator />
              <PasswordSection {...props} />
              <Button type="submit">Simpan Perubahan</Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  </div>

  {/* Confirmation Dialog */}
  <ConfirmSaveDialog
    open={showConfirmDialog}
    onOpenChange={setShowConfirmDialog}
    onConfirm={handleConfirmSave}
    isLoading={isLoading}
  />
</div>;
```

---

## 🎯 Separation of Concerns

| Concern              | Location                             |
| -------------------- | ------------------------------------ |
| **UI Components**    | `components/` folder                 |
| **State Management** | `page.tsx` (useState, useEffect)     |
| **Data Fetching**    | `page.tsx` (fetchProfileData)        |
| **Form Validation**  | `page.tsx` (validateForm)            |
| **Form Submission**  | `page.tsx` (handleSubmit)            |
| **API Calls**        | `@/app/lib/services/profile.service` |

---

## 🔄 State Flow

```
page.tsx
├── State:
│   ├── isLoading (submit loading)
│   ├── isLoadingData (fetch loading)
│   ├── currentAdmin (original data)
│   ├── formData (form values)
│   └── showConfirmDialog (confirmation dialog state)
│
├── Effects:
│   └── useEffect → fetchProfileData()
│
├── Handlers:
│   ├── handleInputChange()
│   ├── validateForm()
│   ├── handleSubmit() → Shows confirmation dialog
│   └── handleConfirmSave() → Actual API call
│
└── Components:
    ├── ProfilePageHeader (static)
    ├── ProfileFormSkeleton (when loading)
    ├── ProfileInfoForm (receives formData + onChange)
    ├── PasswordSection (receives formData + onChange)
    └── ConfirmSaveDialog (receives open + onConfirm)
```

---

## ✨ Key Features

### 1. **Conditional Loading**

```tsx
{
  isLoadingData ? <ProfileFormSkeleton /> : <ActualForm />;
}
```

### 2. **Controlled Form**

- All inputs controlled via `formData` state
- Single `handleInputChange` for all fields
- Validation before submit

### 3. **Password Visibility Toggle**

- Managed internally in `PasswordSection`
- Independent state for each field
- Eye/EyeOff icon toggle

### 4. **Smart Validation**

- Empty field check
- Email format validation
- Password requirements (min 6 chars)
- Password confirmation match
- Only validate password if user wants to change it

### 5. **Change Detection**

```tsx
const hasNameChange = formData.name !== currentAdmin.name;
const hasEmailChange = formData.email !== currentAdmin.email;
const hasPasswordChange = formData.newPassword !== "";
```

---

## 🎨 Styling

### Colors

- Yellow accent: `#FDFB03` (brand color)
- Hover: `bg-yellow-400`
- Text: `text-black` (on yellow background)

### Layout

- Max width: `max-w-3xl` (outer), `max-w-2xl` (form)
- Centered: `mx-auto`
- Padding: `p-6`
- Spacing: `space-y-6` for form sections

---

## 🚀 Benefits

### Before Refactoring

```
❌ 480 lines dalam satu file
❌ Password toggle logic mixed dengan form logic
❌ Skeleton UI hardcoded di JSX
❌ Repetitive input fields code
❌ Hard to find specific sections
```

### After Refactoring

```
✅ 258 lines (46% reduction)
✅ Password toggle isolated dalam PasswordSection
✅ Reusable ProfileFormSkeleton component
✅ DRY principle dengan ProfileInfoForm & PasswordSection
✅ Clear separation: UI in components, logic in page
✅ Easy to maintain dan modify
```

---

## 📝 Maintenance Guide

### Menambah Field Baru di Profile Info

1. Update interface `FormData` di `page.tsx`
2. Edit `ProfileInfoForm.tsx`
3. Tambah field baru dengan pattern yang sama

### Mengubah Password Rules

1. Edit validation logic di `validateForm()` di `page.tsx`
2. Update placeholder text di `PasswordSection.tsx`

### Mengubah Skeleton

1. Edit `ProfileFormSkeleton.tsx`
2. Sesuaikan dengan struktur form terbaru

---

**Created**: November 7, 2025  
**Refactored From**: 480 lines → 258 lines  
**Components**: 4 components  
**Reduction**: 46%
