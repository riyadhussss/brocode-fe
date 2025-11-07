# Profile Components (Kasir)

Komponen-komponen untuk halaman Profile Kasir yang telah direfactor menggunakan shadcn/ui components, sama seperti Admin Profile.

## 📁 Struktur Komponen

```
kasir/profile/
├── page.tsx (256 lines, reduced from 458 lines - 44% reduction)
└── components/
    ├── ProfilePageHeader.tsx
    ├── ProfileFormSkeleton.tsx
    ├── ProfileInfoForm.tsx
    ├── PasswordSection.tsx
    └── index.ts
```

## 📊 Refactoring Stats

- **Before**: 458 lines dengan custom styling (FaIcons, manual CSS)
- **After**: 256 lines dengan shadcn components (44% reduction)
- **Components**: 4 komponen + index.ts (shared dengan admin)

## 🔄 Perubahan Utama

### Before (Custom Style)

```tsx
// Manual styling dengan FaIcons dari react-icons/fa
<div className="bg-white rounded-xl shadow-sm border border-gray-100">
  <div className="p-6 border-b border-gray-100">
    <div className="flex items-center space-x-3">
      <FaEdit className="text-[#FDFB03] text-xl" />
      <h3 className="text-xl font-semibold text-gray-900">Informasi Profil</h3>
    </div>
  </div>
  <form className="p-6 space-y-6">
    {/* Manual input fields dengan FaUser, FaEnvelope, FaLock */}
    <div className="relative">
      <FaUser className="text-gray-400" size={16} />
      <input className="w-full pl-10 pr-4 py-3..." />
    </div>
    {/* Manual password toggle dengan FaEye/FaEyeSlash */}
    <button onClick={() => setShowPassword(!showPassword)}>
      {showPassword ? <FaEyeSlash /> : <FaEye />}
    </button>
  </form>
</div>
```

### After (Shadcn Style)

```tsx
// Shadcn components dengan lucide-react icons
import { Save, User } from "lucide-react";
import { Card, Button, Separator } from "@/components/ui/...";
import { ProfilePageHeader, ProfileFormSkeleton, ... } from "./components";

<Card>
  <CardHeader>
    <CardTitle className="flex items-center space-x-2">
      <User className="h-5 w-5 text-[#FDFB03]" />
      <span>Informasi Profil</span>
    </CardTitle>
  </CardHeader>
  <CardContent>
    <form onSubmit={handleSubmit} className="space-y-6">
      <ProfileInfoForm formData={formData} onInputChange={handleInputChange} />
      <Separator className="my-6" />
      <PasswordSection formData={formData} onInputChange={handleInputChange} />
      <Button type="submit">Simpan Perubahan</Button>
    </form>
  </CardContent>
</Card>
```

## 🎨 Style Changes

### Icons

- **Before**: `react-icons/fa` (FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaSave, FaEdit)
- **After**: `lucide-react` (User, Mail, Lock, Eye, EyeOff, Save, ShieldCheck, KeyRound)

### Components

- **Before**: Custom `<div>` dengan manual classes
- **After**: Shadcn `<Card>`, `<Button>`, `<Input>`, `<Label>`, `<Separator>`

### Skeleton

- **Before**: Manual skeleton dengan custom classes
- **After**: `<ProfileFormSkeleton />` component

### State Management

- **Before**: 3 state untuk password visibility di page level
  ```tsx
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  ```
- **After**: State dikelola di dalam `<PasswordSection />` component

## 🧩 Komponen yang Digunakan

Menggunakan komponen yang sama dengan Admin Profile:

1. **ProfilePageHeader** - Header dengan ShieldCheck icon
2. **ProfileFormSkeleton** - Loading skeleton
3. **ProfileInfoForm** - Form Nama & Email
4. **PasswordSection** - Section password dengan toggle visibility

## ✨ Benefits

### Consistency

✅ Style konsisten antara Admin dan Kasir  
✅ Menggunakan design system yang sama (shadcn/ui)  
✅ Icon library yang sama (lucide-react)

### Code Reusability

✅ Komponen dapat di-share antara Admin dan Kasir  
✅ Tidak perlu maintain dua set styling berbeda  
✅ Update di satu tempat, semua ikut terupdate

### Maintainability

✅ 44% code reduction (458 → 256 lines)  
✅ Separation of concerns (UI di components, logic di page)  
✅ Easier to debug dan test

### Developer Experience

✅ Consistent API (props pattern sama)  
✅ Better TypeScript support  
✅ Lebih mudah untuk onboarding developer baru

## 📝 Migration Notes

### Removed Dependencies

```diff
- import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaSave, FaEdit } from "react-icons/fa";
+ import { Save, User } from "lucide-react";
```

### Removed Manual State

```diff
- const [showCurrentPassword, setShowCurrentPassword] = useState(false);
- const [showNewPassword, setShowNewPassword] = useState(false);
- const [showConfirmPassword, setShowConfirmPassword] = useState(false);
```

(State sekarang internal di `<PasswordSection />`)

### Added Imports

```tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ProfilePageHeader,
  ProfileFormSkeleton,
  ProfileInfoForm,
  PasswordSection,
} from "./components";
```

---

**Created**: November 7, 2025  
**Refactored From**: 458 lines (custom style) → 256 lines (shadcn style)  
**Components**: 4 shared components (same as Admin)  
**Reduction**: 44%  
**Style**: Custom CSS → Shadcn/UI

## 📁 Struktur Komponen

```
profile/
├── page.tsx (258 lines, reduced from 480 lines - 46% reduction)
└── components/
    ├── ProfilePageHeader.tsx
    ├── ProfileFormSkeleton.tsx
    ├── ProfileInfoForm.tsx
    ├── PasswordSection.tsx
    └── index.ts
```

## 📊 Refactoring Stats

- **Before**: 480 lines dalam satu file
- **After**: 258 lines (46% reduction)
- **Components**: 4 komponen + index.ts

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

## 💻 Page Structure

### Import Pattern

```tsx
import {
  ProfilePageHeader,
  ProfileFormSkeleton,
  ProfileInfoForm,
  PasswordSection,
} from "./components";
```

### JSX Pattern

```tsx
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
              <SubmitButton />
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  </div>
</div>
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
│   └── formData (form values)
│
├── Effects:
│   └── useEffect → fetchProfileData()
│
├── Handlers:
│   ├── handleInputChange()
│   ├── validateForm()
│   └── handleSubmit()
│
└── Components:
    ├── ProfilePageHeader (static)
    ├── ProfileFormSkeleton (when loading)
    ├── ProfileInfoForm (receives formData + onChange)
    └── PasswordSection (receives formData + onChange)
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
