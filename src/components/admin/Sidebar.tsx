"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaUsers,
  FaCut,
  FaCashRegister,
  FaUserShield,
  FaHistory,
  FaBars,
  FaUserEdit,
  FaSignOutAlt,
  FaTachometerAlt,
} from "react-icons/fa";

interface SidebarAdminProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function SidebarAdmin({
  sidebarOpen,
  setSidebarOpen,
}: SidebarAdminProps) {
  const pathname = usePathname();

  const menuItems = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: FaTachometerAlt,
    },
    {
      name: "Manajemen Capster",
      href: "/admin/manajemen-capster",
      icon: FaCut,
    },
    {
      name: "Manajemen Kasir",
      href: "/admin/manajemen-kasir",
      icon: FaCashRegister,
    },
    {
      name: "Manajemen Layanan",
      href: "/admin/manajemen-layanan",
      icon: FaUsers,
    },
    {
      name: "Manajemen User",
      href: "/admin/manajemen-user",
      icon: FaUsers,
    },
    {
      name: "Riwayat Reservasi",
      href: "/admin/riwayat-reservasi",
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
              src=""
              alt="Brocode Logo"
              width={40}
              height={40}
              className="object-contain"
            />
            {sidebarOpen && (
              <div>
                <h1 className="text-xl font-bold text-[#FDFB03]">Brocode</h1>
                <p className="text-sm text-gray-300">Admin Panel</p>
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

      {/* Admin Profile Section */}
      {/* {sidebarOpen && (
        <div className="p-4 border-b border-[#FDFB03]">
          <div className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
            <div className="w-10 h-10 bg-[#FDFB03] rounded-full flex items-center justify-center">
              <FaUserShield className="text-black" size={18} />
            </div>
            <div>
              <p className="font-medium text-[#FDFB03]">Admin User</p>
              <p className="text-sm text-gray-300">admin@brocode.com</p>
            </div>
          </div>
        </div>
      )} */}

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
        <Link href="/admin/update-akun">
          <button
            className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors group ${
              pathname === "/admin/update-akun"
                ? "bg-[#FDFB03] text-black"
                : "hover:bg-gray-800 text-gray-300 hover:text-[#FDFB03]"
            }`}
          >
            <FaUserEdit
              className={`${
                pathname === "/admin/update-akun"
                  ? "text-black"
                  : "text-gray-300 group-hover:text-[#FDFB03]"
              }`}
              size={18}
            />
            {sidebarOpen && (
              <span
                className={`${
                  pathname === "/admin/update-akun"
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
