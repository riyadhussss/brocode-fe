import {
  FaShoppingCart,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaCalendarAlt,
  FaUsers,
  FaCut,
} from "react-icons/fa";

// Dummy data for dashboard metrics
const dashboardData = {
  totalPesanan: 156,
  pesananPending: 12,
  pesananSelesai: 135,
  pesananBatal: 9,
  pendapatanHariIni: 2450000,
  customerHariIni: 18,
  layananTerpopuler: "Haircut Premium",
};

// Recent orders data
const recentOrders = [
  {
    id: "ORD-001",
    customer: "Ahmad Rizki",
    layanan: "Haircut + Beard Trim",
    waktu: "09:30",
    status: "pending",
    total: 75000,
  },
  {
    id: "ORD-002",
    customer: "Budi Santoso",
    layanan: "Haircut Premium",
    waktu: "10:15",
    status: "selesai",
    total: 50000,
  },
  {
    id: "ORD-003",
    customer: "Candra Wijaya",
    layanan: "Shaving + Hair Wash",
    waktu: "11:00",
    status: "pending",
    total: 45000,
  },
  {
    id: "ORD-004",
    customer: "Doni Pratama",
    layanan: "Kids Haircut",
    waktu: "11:30",
    status: "selesai",
    total: 30000,
  },
  {
    id: "ORD-005",
    customer: "Eko Susilo",
    layanan: "Haircut + Styling",
    waktu: "12:15",
    status: "batal",
    total: 65000,
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "selesai":
      return "bg-green-100 text-green-800 border-green-200";
    case "batal":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export default function DashboardKasir() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex">
        <main className="flex-1 p-8 overflow-auto">
          <div className="mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Dashboard Kasir
              </h1>
              <p className="text-gray-600">
                Selamat datang di panel kasir Brocode Aceh Barbershop
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Total Pesanan */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1 uppercase tracking-wide">
                      Total Pesanan
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {dashboardData.totalPesanan}
                    </p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <FaShoppingCart className="text-blue-600 text-xl" />
                  </div>
                </div>
              </div>

              {/* Pesanan Pending */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1 uppercase tracking-wide">
                      Pesanan Pending
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {dashboardData.pesananPending}
                    </p>
                  </div>
                  <div className="p-3 bg-yellow-100 rounded-full">
                    <FaClock className="text-yellow-600 text-xl" />
                  </div>
                </div>
              </div>

              {/* Pesanan Selesai */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1 uppercase tracking-wide">
                      Pesanan Selesai
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {dashboardData.pesananSelesai}
                    </p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-full">
                    <FaCheckCircle className="text-green-600 text-xl" />
                  </div>
                </div>
              </div>

              {/* Pesanan Batal */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1 uppercase tracking-wide">
                      Pesanan Batal
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {dashboardData.pesananBatal}
                    </p>
                  </div>
                  <div className="p-3 bg-red-100 rounded-full">
                    <FaTimesCircle className="text-red-600 text-xl" />
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Orders Table */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Pesanan Terbaru
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Daftar pesanan terbaru yang masuk hari ini
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID Pesanan
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Layanan
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Waktu
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {order.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {order.customer}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {order.layanan}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {order.waktu}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {order.status.charAt(0).toUpperCase() +
                              order.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {formatCurrency(order.total)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
