  import {
    FaUsers,
    FaCut,
    FaCashRegister,
    FaUserShield,
    FaHistory,
  } from "react-icons/fa";

  export default function AdminDashboard() {
    // Data statis sementara
    const dashboardData = {
      totalAdmin: 3,
      totalCapster: 8,
      totalUser: 1247,
      totalLayanan: 12,
      totalReservasi: 2456,
    };

    return (
      <>
        <div className="min-h-screen bg-gray-50 flex">
          <main className="flex-1 p-8 overflow-auto">
            <div className="mx-auto">
              {/* Page Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Dashboard Admin
                </h1>
                <p className="text-gray-600">
                  Selamat datang di panel admin Brocode Barbershop
                </p>
              </div>

              {/* Dashboard Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                {/* Total Admin */}
                <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                        Total Admin
                      </p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">
                        {dashboardData.totalAdmin}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <FaUserShield className="text-blue-600" size={24} />
                    </div>
                  </div>
                </div>

                {/* Total Capster */}
                <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                        Total Capster
                      </p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">
                        {dashboardData.totalCapster}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <FaCut className="text-green-600" size={24} />
                    </div>
                  </div>
                </div>

                {/* Total User */}
                <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                        Total User
                      </p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">
                        {dashboardData.totalUser.toLocaleString()}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <FaUsers className="text-purple-600" size={24} />
                    </div>
                  </div>
                </div>

                {/* Total Layanan */}
                <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                        Total Layanan
                      </p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">
                        {dashboardData.totalLayanan}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                      <FaCashRegister className="text-orange-600" size={24} />
                    </div>
                  </div>
                </div>

                {/* Total Reservasi */}
                <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                        Total Reservasi
                      </p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">
                        {dashboardData.totalReservasi.toLocaleString()}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                      <FaHistory className="text-yellow-600" size={24} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </>
    );
  }
