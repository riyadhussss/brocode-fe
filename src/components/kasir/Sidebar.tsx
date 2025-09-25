"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaCashRegister,
  FaClock,
  FaCalendarAlt,
  FaHistory,
  FaBars,
  FaUserEdit,
  FaSignOutAlt,
  FaTachometerAlt,
} from "react-icons/fa";

interface SidebarKasirProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function SidebarKasir({
  sidebarOpen,
  setSidebarOpen,
}: SidebarKasirProps) {
  const pathname = usePathname();

  const menuItems = [
    {
      name: "Dashboard",
      href: "/kasir",
      icon: FaTachometerAlt,
    },
    {
      name: "Atur Jadwal",
      href: "/kasir/atur-jadwal",
      icon: FaClock,
    },
    {
      name: "Manajemen Reservasi",
      href: "/kasir/manajemen-reservasi",
      icon: FaCalendarAlt,
    },
    {
      name: "Riwayat Reservasi",
      href: "/kasir/riwayat-reservasi-kasir",
      icon: FaHistory,
    },
  ];

  const handleLogout = () => {
    // Implement logout logic here
    console.log("Logout clicked");
    // Redirect to login page or clear session
  };

  return (
    <aside
      className={`${
        sidebarOpen ? "w-72" : "w-20"
      } bg-black shadow-xl transition-all duration-300 flex-shrink-0 border-r-2 border-[#FDFB03] flex flex-col fixed left-0 top-0 h-screen`}
    >
      {/* Sidebar Header */}
      <div className="p-6 border-b border-[#FDFB03]">
        <div className="flex items-center justify-between">
          <div
            className={`flex items-center space-x-3 ${
              !sidebarOpen && "justify-center"
            }`}
          >
            <Image
              src="/assets/logo.png"
              alt="Brocode Logo"
              width={40}
              height={40}
              className="object-contain"
            />
            {sidebarOpen && (
              <div>
                <h1 className="text-xl font-bold text-[#FDFB03]">Brocode</h1>
                <p className="text-sm text-gray-300">Kasir Panel</p>
              </div>
            )}
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <FaBars className="text-[#FDFB03]" size={18} />
          </button>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <div key={item.name}>
              <Link href={item.href}>
                <button
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors group ${
                    isActive
                      ? "bg-[#FDFB03] text-black"
                      : "hover:bg-gray-800 text-gray-300 hover:text-[#FDFB03]"
                  }`}
                >
                  <Icon
                    className={`${
                      isActive
                        ? "text-black"
                        : "text-gray-300 group-hover:text-[#FDFB03]"
                    }`}
                    size={18}
                  />
                  {sidebarOpen && (
                    <span
                      className={`${
                        isActive
                          ? "text-black font-medium"
                          : "text-gray-300 group-hover:text-[#FDFB03]"
                      }`}
                    >
                      {item.name}
                    </span>
                  )}
                </button>
              </Link>
            </div>
          );
        })}
      </nav>

      {/* Bottom Menu - Update Akun & Logout */}
      <div className="p-4 border-t border-[#FDFB03] space-y-2 mt-auto">
        {/* Update Akun */}
        <Link href="/kasir/update-akun-kasir">
          <button
            className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors group ${
              pathname === "/kasir/update-akun-kasir"
                ? "bg-[#FDFB03] text-black"
                : "hover:bg-gray-800 text-gray-300 hover:text-[#FDFB03]"
            }`}
          >
            <FaUserEdit
              className={`${
                pathname === "/kasir/update-akun-kasir"
                  ? "text-black"
                  : "text-gray-300 group-hover:text-[#FDFB03]"
              }`}
              size={18}
            />
            {sidebarOpen && (
              <span
                className={`${
                  pathname === "/kasir/update-akun-kasir"
                    ? "text-black font-medium"
                    : "text-gray-300 group-hover:text-[#FDFB03]"
                }`}
              >
                Update Akun
              </span>
            )}
          </button>
        </Link>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-red-900 transition-colors group"
        >
          <FaSignOutAlt
            className="text-gray-300 group-hover:text-red-400"
            size={18}
          />
          {sidebarOpen && (
            <span className="text-gray-300 group-hover:text-red-400">
              Log Out
            </span>
          )}
        </button>
      </div>
    </aside>
  );
}
