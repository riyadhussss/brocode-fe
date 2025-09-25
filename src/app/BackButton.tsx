"use client";

import { FaArrowLeft } from "react-icons/fa";

export default function BackButton() {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <button
      onClick={handleBack}
      className="w-full bg-transparent border-2 border-[#FDFB03] text-[#FDFB03] hover:bg-[#FDFB03] hover:text-black font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-3"
    >
      <FaArrowLeft size={18} />
      <span>Halaman Sebelumnya</span>
    </button>
  );
}
