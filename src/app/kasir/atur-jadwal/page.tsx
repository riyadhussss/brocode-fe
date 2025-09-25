"use client";

import { useState } from "react";
import {
  FaSave,
  FaClock,
  FaUser,
  FaCalendarAlt,
  FaCheck,
  FaTimes,
} from "react-icons/fa";

// Data capster dari admin
const capsters = [
  { id: 1, nama: "Ahmad Rizki" },
  { id: 2, nama: "Budi Santoso" },
  { id: 3, nama: "Chandra Wijaya" },
  { id: 4, nama: "Doni Prakoso" },
];

// Hari dalam seminggu
const daysOfWeek = [
  { id: "senin", name: "Senin", short: "Sen" },
  { id: "selasa", name: "Selasa", short: "Sel" },
  { id: "rabu", name: "Rabu", short: "Rab" },
  { id: "kamis", name: "Kamis", short: "Kam" },
  { id: "jumat", name: "Jumat", short: "Jum" },
  { id: "sabtu", name: "Sabtu", short: "Sab" },
  { id: "minggu", name: "Minggu", short: "Min" },
];

// Slot waktu
const timeSlots = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
];

// Interface untuk schedule
interface ScheduleItem {
  capsterId: number;
  day: string;
  time: string;
  available: boolean;
}

// Default schedule data
const generateDefaultSchedule = (): ScheduleItem[] => {
  const schedule: ScheduleItem[] = [];
  capsters.forEach((capster) => {
    daysOfWeek.forEach((day) => {
      timeSlots.forEach((time) => {
        schedule.push({
          capsterId: capster.id,
          day: day.id,
          time: time,
          available: true, // Default semua tersedia
        });
      });
    });
  });
  return schedule;
};

export default function AturJadwal() {
  const [selectedCapster, setSelectedCapster] = useState<number>(1);
  const [selectedDay, setSelectedDay] = useState<string>("senin");
  const [schedule, setSchedule] = useState<ScheduleItem[]>(
    generateDefaultSchedule()
  );

  // Toggle availability untuk slot tertentu
  const toggleAvailability = (capsterId: number, day: string, time: string) => {
    setSchedule((prevSchedule) =>
      prevSchedule.map((item) =>
        item.capsterId === capsterId && item.day === day && item.time === time
          ? { ...item, available: !item.available }
          : item
      )
    );
  };

  // Get schedule untuk capster dan hari tertentu
  const getScheduleForCapsterAndDay = (capsterId: number, day: string) => {
    return schedule.filter(
      (item) => item.capsterId === capsterId && item.day === day
    );
  };

  // Toggle semua slot untuk hari tertentu
  const toggleAllSlotsForDay = (
    capsterId: number,
    day: string,
    available: boolean
  ) => {
    setSchedule((prevSchedule) =>
      prevSchedule.map((item) =>
        item.capsterId === capsterId && item.day === day
          ? { ...item, available }
          : item
      )
    );
  };

  const handleSaveSchedule = () => {
    console.log("Menyimpan jadwal:", schedule);
    // TODO: Implement save schedule functionality
    alert("Jadwal berhasil disimpan!");
  };

  const selectedCapsterData = capsters.find((c) => c.id === selectedCapster);
  const daySchedule = getScheduleForCapsterAndDay(selectedCapster, selectedDay);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <main className="flex-1 p-8 overflow-auto">
        <div className="mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Atur Jadwal Capster
            </h1>
            <p className="text-gray-600">
              Kelola jadwal ketersediaan setiap capster untuk menerima reservasi
            </p>
          </div>

          {/* Controls */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pilih Capster */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaUser className="inline mr-2" />
                  Pilih Capster
                </label>
                <select
                  value={selectedCapster}
                  onChange={(e) => setSelectedCapster(parseInt(e.target.value))}
                  title="Pilih Capster"
                  aria-label="Pilih Capster"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FDFB03] focus:border-[#FDFB03]"
                >
                  {capsters.map((capster) => (
                    <option key={capster.id} value={capster.id}>
                      {capster.nama}
                    </option>
                  ))}
                </select>
              </div>

              {/* Pilih Hari */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaCalendarAlt className="inline mr-2" />
                  Pilih Hari
                </label>
                <select
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(e.target.value)}
                  title="Pilih Hari"
                  aria-label="Pilih Hari"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FDFB03] focus:border-[#FDFB03]"
                >
                  {daysOfWeek.map((day) => (
                    <option key={day.id} value={day.id}>
                      {day.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Schedule Grid */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Jadwal {selectedCapsterData?.nama} -{" "}
                  {daysOfWeek.find((d) => d.id === selectedDay)?.name}
                </h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() =>
                      toggleAllSlotsForDay(selectedCapster, selectedDay, true)
                    }
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                  >
                    <FaCheck className="inline mr-1" />
                    Buka Semua
                  </button>
                  <button
                    onClick={() =>
                      toggleAllSlotsForDay(selectedCapster, selectedDay, false)
                    }
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                  >
                    <FaTimes className="inline mr-1" />
                    Tutup Semua
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {timeSlots.map((time) => {
                  const scheduleItem = daySchedule.find(
                    (item) => item.time === time
                  );
                  const isAvailable = scheduleItem?.available ?? false;

                  return (
                    <button
                      key={time}
                      onClick={() =>
                        toggleAvailability(selectedCapster, selectedDay, time)
                      }
                      className={`p-4 rounded-lg border-2 transition-all duration-200 text-center ${
                        isAvailable
                          ? "bg-green-50 border-green-300 text-green-800 hover:bg-green-100"
                          : "bg-red-50 border-red-300 text-red-800 hover:bg-red-100"
                      }`}
                    >
                      <div className="flex flex-col items-center space-y-2">
                        <FaClock className="text-lg" />
                        <span className="font-medium">{time}</span>
                        <span className="text-xs">
                          {isAvailable ? "Tersedia" : "Tutup"}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Week Overview */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-900">
                Ringkasan Jadwal Mingguan - {selectedCapsterData?.nama}
              </h3>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {daysOfWeek.map((day) => {
                  const dayScheduleData = getScheduleForCapsterAndDay(
                    selectedCapster,
                    day.id
                  );
                  const availableSlots = dayScheduleData.filter(
                    (item) => item.available
                  ).length;
                  const totalSlots = dayScheduleData.length;
                  const percentage = Math.round(
                    (availableSlots / totalSlots) * 100
                  );

                  return (
                    <div
                      key={day.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                        selectedDay === day.id
                          ? "border-[#FDFB03] bg-yellow-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setSelectedDay(day.id)}
                    >
                      <div className="text-center">
                        <h4 className="font-medium text-gray-900 mb-2">
                          {day.name}
                        </h4>
                        <div className="text-2xl font-bold mb-1">
                          <span className="text-green-600">
                            {availableSlots}
                          </span>
                          <span className="text-gray-400">/{totalSlots}</span>
                        </div>
                        <div className="text-sm text-gray-600 mb-2">
                          {percentage}% tersedia
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`bg-green-600 h-2 rounded-full transition-all duration-300 ${
                              percentage === 0
                                ? "w-0"
                                : percentage <= 10
                                ? "w-[10%]"
                                : percentage <= 20
                                ? "w-1/5"
                                : percentage <= 25
                                ? "w-1/4"
                                : percentage <= 30
                                ? "w-[30%]"
                                : percentage <= 40
                                ? "w-2/5"
                                : percentage <= 50
                                ? "w-1/2"
                                : percentage <= 60
                                ? "w-3/5"
                                : percentage <= 70
                                ? "w-[70%]"
                                : percentage <= 75
                                ? "w-3/4"
                                : percentage <= 80
                                ? "w-4/5"
                                : percentage <= 90
                                ? "w-[90%]"
                                : percentage < 100
                                ? "w-[95%]"
                                : "w-full"
                            }`}
                          ></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSaveSchedule}
              className="px-8 py-4 bg-[#FDFB03] hover:bg-yellow-400 text-black font-semibold rounded-lg transition-colors flex items-center space-x-2 shadow-lg"
            >
              <FaSave />
              <span>Simpan Jadwal</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
