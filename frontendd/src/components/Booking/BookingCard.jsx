export default function BookingCard({ booking, isAdmin, onCancel }) {
  const renderBookingDate = () => {
    try {
      if (booking.bookingTime) {
        // bookingTime sudah format ISO (yyyy-MM-ddTHH:mm:ss)
        return new Date(booking.bookingTime).toLocaleString("id-ID", {
          dateStyle: "full",
          timeStyle: "short",
        });
      }
      if (booking.bookingDate) {
        return new Date(booking.bookingDate).toLocaleDateString("id-ID", {
          dateStyle: "full",
        });
      }
      if (booking.date) {
        return new Date(booking.date).toLocaleString("id-ID");
      }
      if (booking.createdAt) {
        return new Date(booking.createdAt).toLocaleString("id-ID");
      }
      return "-";
    } catch (e) {
      console.error("renderBookingDate error:", e, booking);
      return booking.bookingDate || booking.bookingTime || "-";
    }
  };

  return (
    <div className="p-4">
      {/* Nama Peliharaan */}
      <h3 className="text-lg font-semibold text-gray-800">
        Pet: {booking.pet?.name || booking.petName || "Unknown Pet"}
      </h3>

      {/* Layanan */}
      <p className="text-sm text-gray-500">
        Service: {booking.service?.name || booking.serviceName || "-"}
      </p>

      {/* Tanggal */}
      <p className="text-sm text-gray-500">
        Date: {renderBookingDate()}
      </p>

      {/* Status */}
      <p className="text-sm text-gray-500">Status: {booking.status}</p>

      {/* Info User (hanya untuk Admin) */}
      {isAdmin && (
        <>
          <p className="text-sm text-gray-500">
            Customer: {booking.user?.name || booking.user?.fullName || "Unknown"}
          </p>
          <p className="text-sm text-gray-500">
            Email: {booking.user?.email || "-"}
          </p>
          <p className="text-sm text-gray-500">
            Phone: {booking.user?.phone || "-"}
          </p>
        </>
      )}

      {/* Tombol Cancel */}
      {onCancel && booking.status === "PENDING" && (
        <button
          onClick={onCancel}
          className="mt-2 px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700"
        >
          Cancel
        </button>
      )}
    </div>
  );
}
