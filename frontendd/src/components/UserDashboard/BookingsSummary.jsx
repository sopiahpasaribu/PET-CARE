// src/components/UserDashboard/BookingsSummary.jsx
import { Link } from "react-router-dom";

export default function BookingsSummary({ bookings }) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20 group hover:shadow-xl transition-all duration-300">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Booking Terbaru</h2>
        <Link to="/user/bookings" className="text-orange-600 text-sm hover:underline font-medium">Lihat Semua →</Link>
      </div>

      {bookings.length > 0 ? (
        <div className="space-y-4">
          {bookings.slice(0, 3).map(booking => (
            <div key={booking.id} className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200/50">
              <h4 className="font-semibold text-gray-800">{booking.service_name}</h4>
              <p className="text-sm text-gray-600">{booking.pet_name} • {booking.outlet_name}</p>
              <p className="text-xs text-gray-500">{booking.date} {booking.time}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 px-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200/50">
          <p className="text-gray-600 mb-3">Anda belum memiliki booking</p>
          <Link to="/user/services" className="inline-flex items-center text-blue-600 font-medium text-sm hover:underline">
            Pesan Layanan
          </Link>
        </div>
      )}
    </div>
  );
}
