import { useState, useEffect } from 'react';
import { getAllBookings, updateBookingStatus, searchBookings, sortBookings } from '../../services/api';
import LoadingSpinner from '../../components/Common/LoadingSpinner';

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetchAllBookings();
  }, []);

  const fetchAllBookings = async () => {
    try {
      const data = await getAllBookings();
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      fetchAllBookings();
      return;
    }
    try {
      const data = await searchBookings(searchTerm);
      setBookings(data);
    } catch (error) {
      console.error('Error searching bookings:', error);
    }
  };

  const handleSort = async () => {
    try {
      const newOrder = sortOrder === "asc" ? "desc" : "asc";
      setSortOrder(newOrder);
      const data = await sortBookings(newOrder);
      setBookings(data);
    } catch (error) {
      console.error('Error sorting bookings:', error);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      const updatedBooking = await updateBookingStatus(id, status);
      setBookings(bookings.map(booking =>
        booking.id === id ? updatedBooking : booking
      ));
    } catch (error) {
      console.error('Error updating booking status:', error);
    }
  };

  const renderBookingDate = (booking) => {
    if (booking.bookingTime) {
      return new Date(booking.bookingTime).toLocaleString([], {
        dateStyle: "medium",
        timeStyle: "short",
      });
    }
    return "-";
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">All Bookings</h1>
        <div className="flex space-x-4">
          {/* 🔍 Search Input */}
          <input
            type="text"
            placeholder="Search bookings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border rounded-md text-sm"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Search
          </button>

          {/* 🔄 Sort Button */}
          <button
            onClick={handleSort}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Sort: {sortOrder.toUpperCase()}
          </button>
        </div>
      </div>

      {bookings.length > 0 ? (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">BOOKING ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">SERVICE</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">PET</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">CUSTOMER</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">DATE</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">STATUS</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="px-6 py-4 text-sm text-gray-900">{booking.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{booking.service?.name || "-"}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{booking.pet?.name || "Unknown Pet"}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{booking.user?.name || "Unknown"}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{renderBookingDate(booking)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 inline-flex text-xs font-semibold rounded-full 
                      ${booking.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                        booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' :
                          booking.status === 'COMPLETED' ? 'bg-blue-100 text-blue-800' :
                            'bg-red-100 text-red-800'}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <div className="flex space-x-2">
                      {booking.status === 'PENDING' && (
                        <>
                          <button
                            onClick={() => handleUpdateStatus(booking.id, 'CONFIRMED')}
                            className="text-green-600 hover:text-green-900"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => handleUpdateStatus(booking.id, 'CANCELLED')}
                            className="text-red-600 hover:text-red-900"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {booking.status === 'CONFIRMED' && (
                        <button
                          onClick={() => handleUpdateStatus(booking.id, 'COMPLETED')}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Complete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden p-8 text-center">
          <p className="text-gray-500 text-lg">No bookings found</p>
        </div>
      )}
    </div>
  );
}
