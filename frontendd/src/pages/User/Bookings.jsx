import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getMyBookings, deleteBooking } from '../../services/api';
import BookingCard from '../../components/Booking/BookingCard';
import LoadingSpinner from '../../components/Common/LoadingSpinner';
import Footer from "../../components/Common/Footer";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();
  const location = useLocation();

  const fetchBookings = async () => {
    setLoading(true);
    setErr(null);

    const token = localStorage.getItem('token');
    if (!token) {
      setErr('Silakan login terlebih dahulu.');
      setLoading(false);
      navigate('/login');
      return;
    }

    try {
      const data = await getMyBookings();
      setBookings(Array.isArray(data) ? data : (data.bookings || []));
    } catch (error) {
      console.error('fetchBookings err:', error);
      if (error?.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
        return;
      }
      setErr(error?.response?.data?.message || error?.message || 'Gagal memuat booking');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (location.state?.refresh) {
      fetchBookings();
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  const handleCancel = async (id) => {
    const confirmCancel = window.confirm('Batalkan booking ini?');
    if (!confirmCancel) return;

    try {
      await deleteBooking(id);
      fetchBookings();
    } catch (error) {
      console.error('deleteBooking err:', error);
      if (error?.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
        return;
      }
      alert(error?.response?.data?.message || error?.message || 'Gagal membatalkan booking');
    }
  };

  const getFilteredBookings = () => {
    switch (filter) {
      case 'completed':
        return bookings.filter(booking => booking.status === 'COMPLETED');
      case 'confirmed':
        return bookings.filter(booking => booking.status === 'CONFIRMED');
      case 'cancelled':
        return bookings.filter(booking => booking.status === 'CANCELLED');
      default:
        return bookings;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'CONFIRMED': return 'bg-green-100 text-green-800';
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      case 'COMPLETED': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'CONFIRMED': return '✅';
      case 'PENDING': return '⏳';
      case 'CANCELLED': return '❌';
      case 'COMPLETED': return '✅';
      default: return '📋';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner />
          <p className="mt-4 text-gray-600">Memuat data booking...</p>
        </div>
      </div>
    );
  }

  const filteredBookings = getFilteredBookings();

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-blue-50 py-8">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent">
            Booking Saya
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Kelola semua booking layanan hewan peliharaan Anda di satu tempat
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-4 shadow-lg border-l-4 border-orange-500">
            <div className="text-3xl font-bold text-gray-800">{bookings.length}</div>
            <div className="text-sm text-gray-600">Total Booking</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-lg border-l-4 border-blue-500">
            <div className="text-3xl font-bold text-gray-800">
              {bookings.filter(b => b.status === 'CONFIRMED').length}
            </div>
            <div className="text-sm text-gray-600">Terkonfirmasi</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-lg border-l-4 border-yellow-500">
            <div className="text-3xl font-bold text-gray-800">
              {bookings.filter(b => b.status === 'PENDING').length}
            </div>
            <div className="text-sm text-gray-600">Menunggu</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-lg border-l-4 border-green-500">
            <div className="text-3xl font-bold text-gray-800">
              {bookings.filter(b => b.status === 'COMPLETED').length}
            </div>
            <div className="text-sm text-gray-600">Selesai</div>
          </div>
        </div>

        {err && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-2xl mb-8 flex items-center">
            <span className="text-xl mr-3">⚠️</span>
            <div>
              <strong className="font-bold">Error: </strong>
              {err}
            </div>
          </div>
        )}

        {/* Filter Section */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-800">Filter Booking</h2>
            <div className="flex flex-wrap gap-2">
              {['all', 'completed', 'confirmed', 'cancelled'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${filter === f
                      ? 'bg-orange-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  {f === 'all' && 'Semua'}
                  {f === 'completed' && 'Selesai'}
                  {f === 'confirmed' && 'Terkonfirmasi'}
                  {f === 'cancelled' && 'Dibatalkan'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bookings List - Perbaikan di bagian ini */}
        <div className="space-y-6">
          {filteredBookings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-white overflow-hidden relative flex flex-col h-full"
                >
                  {/* Status Badge */}
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)} flex items-center gap-1 z-10`}>
                    <span>{getStatusIcon(booking.status)}</span>
                    {booking.status === 'CONFIRMED' && 'Terkonfirmasi'}
                    {booking.status === 'PENDING' && 'Menunggu'}
                    {booking.status === 'CANCELLED' && 'Dibatalkan'}
                    {booking.status === 'COMPLETED' && 'Selesai'}
                  </div>

                  <div className="p-5 flex-grow">
                    <BookingCard
                      booking={booking}
                      onCancel={() => handleCancel(booking.id)}
                    />
                  </div>
                  
                  {/* Action Button */}
                  <div className="px-5 pb-5 mt-auto">
                    {booking.status === 'PENDING' || booking.status === 'CONFIRMED' ? (
                      <button
                        onClick={() => handleCancel(booking.id)}
                        className="w-full py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors duration-200 font-medium"
                      >
                        Batalkan Booking
                      </button>
                    ) : (
                      <button
                        onClick={() => navigate(`/booking/${booking.id}`)}
                        className="w-full py-2 bg-gray-50 text-gray-600 rounded-xl hover:bg-gray-100 transition-colors duration-200 font-medium"
                      >
                        Lihat Detail
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
              <div className="text-6xl mb-4">📅</div>
              <h3 className="text-2xl font-medium text-gray-900 mb-3">
                {filter !== 'all' ? `Tidak ada booking ${filter}` : 'Belum ada booking'}
              </h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                {filter !== 'all'
                  ? `Tidak ada booking yang sesuai dengan filter "${filter}"`
                  : 'Anda belum memiliki booking layanan. Silakan booking layanan terlebih dahulu.'
                }
              </p>
              {filter !== 'all' ? (
                <button
                  onClick={() => setFilter('all')}
                  className="px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  Lihat Semua Booking
                </button>
              ) : (
                <button
                  onClick={() => navigate('/services')}
                  className="px-6 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  Lihat Layanan
                </button>
              )}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        {bookings.length > 0 && (
          <div className="mt-10 text-center">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Butuh Bantuan?</h3>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => navigate('/user/services')}
                  className="px-6 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2"
                >
                  <span>➕</span> Booking Layanan Baru
                </button>
                <button
                  onClick={() => navigate('/user/pets')}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2"
                >
                  <span>🐾</span> Kelola Hewan Peliharaan
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}