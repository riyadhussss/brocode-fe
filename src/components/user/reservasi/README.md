# Komponen Reservasi

Komponen reservasi telah direfactor menjadi komponen-komponen terpisah untuk memudahkan maintenance dan pengembangan.

## Struktur Komponen

```
src/
├── app/
│   └── user/
│       └── reservasi/
│           └── page.tsx (Main page - 388 baris)
└── components/
    └── user/
        └── reservasi/
            ├── index.ts
            ├── ReservationStepper.tsx
            ├── Step1PersonalInfo.tsx
            ├── Step2PackageSelection.tsx
            ├── Step3CapsterSchedule.tsx
            ├── Step4Confirmation.tsx
            ├── Step5Payment.tsx
            └── ReservationSuccess.tsx
```

## Komponen-Komponen

### 1. **ReservationStepper.tsx**

Komponen untuk menampilkan progress indicator step-by-step.

**Props:**

- `steps`: Array of step objects (id, label, icon)
- `currentStep`: Current active step number

**Features:**

- Visual progress line
- Icon untuk setiap step
- Checkmark untuk completed steps
- Highlight untuk current step

---

### 2. **Step1PersonalInfo.tsx**

Komponen untuk input data pribadi customer.

**Props:**

- `formData`: { nama, nomorHP, email }
- `isBookingForSelf`: Boolean untuk checkbox
- `isLoadingAuto`: Loading state untuk auto-fill
- `isSavingManualData`: Loading state untuk save manual
- `onInputChange`: Handler untuk input change
- `onBookingForSelfChange`: Handler untuk checkbox
- `onManualInputBlur`: Handler untuk blur (save API)

**Features:**

- Checkbox "Booking untuk diri sendiri"
- Auto-fill dari API `reservationAuto` jika checked
- Manual input dengan save ke API `reservationOther` saat blur
- Loading skeleton saat fetching data
- Validasi format email

---

### 3. **Step2PackageSelection.tsx**

Komponen untuk memilih paket layanan.

**Props:**

- `packages`: Array of package objects
- `selectedPackage`: Selected package ID
- `isLoadingPackages`: Loading state
- `onPackageSelect`: Handler untuk selection

**Features:**

- Grid layout (2 cols mobile, 4 cols desktop)
- Box-based selection UI
- Nama paket dan harga di atas
- Deskripsi di bawah
- Highlight selected package
- Loading skeleton

---

### 4. **Step3CapsterSchedule.tsx**

Komponen untuk memilih capster dan jadwal.

**Props:**

- `capsters`: Array of barber objects
- `selectedCapster`: Selected capster ID
- `schedules`: Array of schedule objects
- `selectedDate`: Selected date string
- `selectedTime`: Selected time slot
- `isLoadingCapsters`: Loading state for capsters
- `isLoadingSchedules`: Loading state for schedules
- `onCapsterSelect`: Handler untuk capster selection
- `onDateSelect`: Handler untuk date selection
- `onTimeSelect`: Handler untuk time selection

**Features:**

- Capster grid dengan foto profil (2 cols mobile, 4 cols desktop)
- Dynamic schedule loading berdasarkan capster
- Date picker dengan available dates only
- Time slot grid (4 cols mobile, 6 cols desktop)
- Format tanggal dalam bahasa Indonesia
- Loading skeleton untuk semua async operations

---

### 5. **Step4Confirmation.tsx**

Komponen untuk konfirmasi data reservasi.

**Props:**

- `formData`: Complete reservation form data
- `packages`: Array of packages (untuk lookup)
- `capsters`: Array of capsters (untuk lookup)
- `onCatatanChange`: Handler untuk textarea catatan

**Features:**

- Summary box dengan semua data
- Grid layout 2 columns
- Format tanggal Indonesia
- Format harga dengan locale
- Textarea untuk catatan opsional

---

### 6. **Step5Payment.tsx**

Komponen untuk informasi pembayaran dan submit.

**Props:**

- `selectedPackage`: Selected package object
- `onSubmit`: Handler untuk submit reservation

**Features:**

- Display total pembayaran
- Informasi pembayaran di kasir
- Button konfirmasi reservasi

---

### 7. **ReservationSuccess.tsx**

Komponen untuk tampilan sukses setelah reservasi dibuat.

**Features:**

- Icon success (checkmark)
- Message sukses
- Link ke riwayat reservasi
- Link untuk buat reservasi baru

---

## Main Page (page.tsx)

Main page bertanggung jawab untuk:

- State management semua form data
- API calls (fetch packages, capsters, schedules)
- Step navigation dan validation
- Event handlers yang di-pass ke komponen children
- Conditional rendering step components

**State Variables:**

- `currentStep`: Current step number
- `formData`: Complete reservation form
- `showSuccess`: Toggle success view
- `isBookingForSelf`: Checkbox state
- `isLoadingAuto`: Loading auto-fill
- `packages`: List paket layanan
- `isLoadingPackages`: Loading packages
- `isSavingManualData`: Loading manual save
- `capsters`: List capster
- `isLoadingCapsters`: Loading capsters
- `schedules`: List jadwal
- `isLoadingSchedules`: Loading schedules
- `selectedDate`: Selected date

**Functions:**

- `fetchActivePackages()`: Fetch paket layanan
- `fetchActiveCapsters()`: Fetch daftar capster
- `fetchAvailableSchedules(capsterId)`: Fetch jadwal by capster
- `handleInputChange()`: Handle input changes
- `handleBookingForSelfChange()`: Handle checkbox & auto-fill
- `handleManualInputBlur()`: Save manual data to API
- `handleCapsterSelect()`: Handle capster selection
- `handleDateSelect()`: Handle date selection
- `handleTimeSelect()`: Handle time selection
- `handlePackageSelect()`: Handle package selection
- `validateStep(step)`: Validate each step
- `handleNextStep()`: Navigate to next step
- `handlePreviousStep()`: Navigate to previous step
- `handleSubmit()`: Submit reservation

---

## Keuntungan Refactoring

1. **Modularity**: Setiap step dalam file terpisah, lebih mudah dipahami
2. **Reusability**: Komponen bisa digunakan kembali di tempat lain
3. **Maintainability**: Lebih mudah debug dan update
4. **Readability**: Main page hanya 388 baris vs 1014 baris sebelumnya
5. **Testing**: Setiap komponen bisa ditest secara terpisah
6. **Team Work**: Multiple developer bisa kerja di komponen berbeda

---

## API Integration

### Endpoints yang digunakan:

1. **reservationAuto** (POST)

   - Request: `{ bookingType: "self" }`
   - Response: `{ success, message, data: { customerData: { name, phone, email } } }`
   - Digunakan untuk auto-fill data user sendiri

2. **reservationOther** (POST)

   - Request: `{ name, phone, email, bookingType: "other" }`
   - Response: `{ success, message }`
   - Digunakan untuk save data customer lain

3. **getActivePackages** (GET)

   - Response: `{ success, message, data: [{ _id, name, price, description }] }`
   - Fetch paket layanan aktif

4. **getActiveCapsters** (GET)

   - Response: `{ success, message, data: [{ _id, name, photo }] }`
   - Fetch daftar capster aktif

5. **getAvailableSchedulesByIdBarber** (GET)
   - Params: `barberId`
   - Response: `{ success, message, data: [{ _id, date, timeSlot }] }`
   - Fetch jadwal available by capster

---

## Tips Development

1. **Menambah Field Baru**: Update interface di main page dan props di komponen terkait
2. **Validasi Tambahan**: Tambahkan di `validateStep()` function di main page
3. **Style Changes**: Edit file komponen individual
4. **API Changes**: Update handler functions di main page
5. **Add New Step**: Buat komponen baru di folder `components/user/reservasi/`

---

## Dependencies

- **react**: Hooks (useState, useEffect)
- **react-icons**: Icon library (FaUser, FaCut, dll)
- **sonner**: Toast notifications
- **shadcn/ui**: Skeleton component
- **Next.js**: Link navigation
- **TypeScript**: Type safety

---

## Browser Support

- Chrome/Edge: Latest
- Firefox: Latest
- Safari: Latest
- Mobile browsers: iOS Safari, Chrome Mobile

---

## Notes

- Semua loading states menggunakan Skeleton dari shadcn/ui
- Error handling menggunakan custom `getErrorMessage()` utility
- Toast notifications di center-top
- Responsive design dengan Tailwind breakpoints
- Warna accent: `#FDFB03` (yellow)
