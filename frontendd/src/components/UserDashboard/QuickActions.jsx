// src/components/UserDashboard/QuickActions.jsx
import { Link } from "react-router-dom";

export default function QuickActions() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 animate-fade-in-up delay-200">
      {/* Card Booking Layanan */}
      <Link to="/user/services" className="bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl shadow-md p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-orange-200/50 group">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-200 rounded-2xl text-orange-600 text-3xl mb-4 group-hover:scale-110">🐾</div>
        <h3 className="font-bold text-gray-800 text-lg mb-2">Booking Layanan</h3>
        <p className="text-sm text-gray-600">Pesan layanan untuk hewan peliharaan Anda</p>
      </Link>

      {/* Card Kelola Hewan */}
      <Link to="/user/pets" className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl shadow-md p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-blue-200/50 group">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-200 rounded-2xl text-blue-600 text-3xl mb-4 group-hover:scale-110">🐕</div>
        <h3 className="font-bold text-gray-800 text-lg mb-2">Kelola Hewan</h3>
        <p className="text-sm text-gray-600">Tambah atau edit profil hewan peliharaan</p>
      </Link>

      {/* Card Riwayat Booking */}
      <Link to="/user/bookings" className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl shadow-md p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-green-200/50 group">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-200 rounded-2xl text-green-600 text-3xl mb-4 group-hover:scale-110">📅</div>
        <h3 className="font-bold text-gray-800 text-lg mb-2">Riwayat Booking</h3>
        <p className="text-sm text-gray-600">Lihat dan kelola booking Anda</p>
      </Link>
    </div>
  );
}
