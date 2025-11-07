# Dashboard Components

Komponen-komponen untuk halaman Dashboard Admin yang sudah direfactor untuk memudahkan maintenance.

## 📁 Struktur Komponen

```
components/
├── DashboardHeader.tsx      # Header halaman dashboard
├── DashboardStatsCard.tsx   # Card statistik individual (reusable)
├── DashboardStats.tsx       # Grid container untuk semua stats cards
└── index.ts                 # Export barrel file
```

## 🧩 Komponen

### 1. DashboardHeader

Komponen header untuk dashboard dengan judul dan deskripsi.

**Props:**

- `title` (string) - Judul halaman dashboard
- `description` (string) - Deskripsi singkat dashboard

**Contoh Penggunaan:**

```tsx
<DashboardHeader
  title="Dashboard Admin"
  description="Selamat datang di panel admin Brocode Barbershop"
/>
```

---

### 2. DashboardStatsCard

Komponen reusable untuk menampilkan card statistik dengan icon.

**Props:**

- `title` (string) - Judul card statistik
- `value` (number | string) - Nilai statistik yang ditampilkan
- `icon` (LucideIcon) - Icon dari lucide-react
- `loading` (boolean, optional) - Status loading, default: false
- `formatNumber` (boolean, optional) - Format number dengan thousand separator, default: false

**Features:**

- ✅ Loading state dengan Skeleton
- ✅ Auto format number jika `formatNumber={true}`
- ✅ Responsive layout
- ✅ Consistent styling dengan shadcn/ui

**Contoh Penggunaan:**

```tsx
<DashboardStatsCard
  title="Total Admin"
  value={10}
  icon={Users}
  loading={false}
  formatNumber={false}
/>
```

---

### 3. DashboardStats

Container grid untuk menampilkan semua card statistik dashboard.

**Props:**

- `data` (DashboardData) - Object berisi semua data statistik
  - `totalAdmin` (number)
  - `totalCapster` (number)
  - `totalCustomer` (number)
  - `totalLayanan` (number)
  - `totalReservasi` (number)
- `loading` (boolean, optional) - Status loading untuk semua cards, default: false

**Features:**

- ✅ Responsive grid (1 col mobile → 2 cols tablet → 5 cols desktop)
- ✅ Automatic icon assignment untuk setiap stat
- ✅ Format number otomatis untuk customer & reservasi
- ✅ Menggunakan config array untuk maintainability

**Contoh Penggunaan:**

```tsx
<DashboardStats
  data={{
    totalAdmin: 5,
    totalCapster: 12,
    totalCustomer: 1234,
    totalLayanan: 8,
    totalReservasi: 567,
  }}
  loading={false}
/>
```

---

## 📊 Stats Configuration

Stats cards menggunakan konfigurasi array di dalam `DashboardStats`:

| Title           | Icon      | Format Number |
| --------------- | --------- | ------------- |
| Total Admin     | Users     | ❌            |
| Total Capster   | Scissors  | ❌            |
| Total Customer  | UserCheck | ✅            |
| Total Layanan   | Wrench    | ❌            |
| Total Reservasi | Calendar  | ✅            |

---

## 🔄 Refactoring Benefits

### Sebelum (183 lines)

```tsx
// ❌ Semua logic dan UI dalam satu file
// ❌ Repetitive code untuk setiap card
// ❌ Sulit maintenance jika ada perubahan styling
// ❌ Tidak reusable
```

### Sesudah (83 lines di page.tsx + komponen terpisah)

```tsx
// ✅ Logic terpisah dari UI
// ✅ Komponen reusable (DashboardStatsCard)
// ✅ Mudah menambah/edit stats baru
// ✅ Lebih mudah di-test
// ✅ Better code organization
```

**Pengurangan Kode:**

- Main page: 183 → 83 lines (55% reduction)
- Code repetition: ~100 lines → 1 config array
- Maintainability: Perubahan styling cukup di 1 komponen

---

## 🎨 Styling

Semua komponen menggunakan:

- **shadcn/ui components**: Card, CardHeader, CardTitle, CardContent, Skeleton
- **Tailwind CSS**: Utility classes untuk responsive design
- **lucide-react**: Modern icon library
- **Consistent spacing**: mb-6, gap-4, pb-2

---

## 🚀 Usage di Page

```tsx
import { DashboardHeader, DashboardStats } from "./components";

export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState({...});
  const [loading, setLoading] = useState(true);

  return (
    <div className="h-full bg-gray-50 p-6 flex flex-col">
      <DashboardHeader
        title="Dashboard Admin"
        description="Selamat datang di panel admin Brocode Barbershop"
      />
      <DashboardStats data={dashboardData} loading={loading} />
    </div>
  );
}
```

---

## 🔧 Maintenance Guide

### Menambah Stats Card Baru:

Edit `DashboardStats.tsx` dan tambahkan ke `statsConfig` array:

```tsx
const statsConfig = [
  // ... existing stats
  {
    title: "Total Kasir",
    value: data.totalKasir,
    icon: CashRegister,
    formatNumber: false,
  },
];
```

### Mengubah Styling Card:

Edit `DashboardStatsCard.tsx` untuk mengubah tampilan semua cards:

```tsx
// Contoh: tambah border color
<Card className="border-l-4 border-blue-500">...</Card>
```

### Menambah Action Button di Header:

Edit `DashboardHeader.tsx` dan tambahkan button:

```tsx
<div className="flex items-center justify-between">
  <div>...</div>
  <Button onClick={onRefresh}>Refresh</Button>
</div>
```

---

## 📝 Type Definitions

```typescript
// DashboardHeader Props
interface DashboardHeaderProps {
  title: string;
  description: string;
}

// DashboardStatsCard Props
interface DashboardStatsCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  loading?: boolean;
  formatNumber?: boolean;
}

// DashboardStats Props
interface DashboardData {
  totalAdmin: number;
  totalCapster: number;
  totalCustomer: number;
  totalLayanan: number;
  totalReservasi: number;
}

interface DashboardStatsProps {
  data: DashboardData;
  loading?: boolean;
}
```

---

## ✅ Best Practices

1. **Reusability**: `DashboardStatsCard` dapat digunakan di dashboard lain (kasir, user, dll)
2. **Single Responsibility**: Setiap komponen punya satu tanggung jawab
3. **Props Validation**: TypeScript interfaces untuk type safety
4. **Loading States**: Skeleton loading untuk UX yang lebih baik
5. **Configuration Array**: Mudah menambah/edit stats tanpa duplikasi kode
6. **Export Barrel**: Import semua komponen dari satu file (`./components`)

---

Created: November 7, 2025
