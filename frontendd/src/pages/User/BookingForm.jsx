// import { useLocation, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { createBooking } from "../../services/api";

// export default function BookingForm() {
//   const { state: service } = useLocation();
//   const navigate = useNavigate();
//   const [outlet, setOutlet] = useState("");
//   const [date, setDate] = useState("");
//   const [time, setTime] = useState("");
//   const [method, setMethod] = useState("antar"); // antar / outlet

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!date || !time) {
//       alert("Tanggal dan waktu wajib diisi!");
//       return;
//     }

//     try {
//       const bookingData = {
//         petId: 1, // TODO: ambil dari pet yang dipilih user
//         serviceId: service.id,
//         bookingDate: date,          // ⬅️ dikirim sesuai DTO (String)
//         bookingTime: `${date}T${time}:00`, // ⬅️ format LocalDateTime (yyyy-MM-ddTHH:mm:ss)
//       };

//       await createBooking(bookingData);
//       alert("Booking berhasil!");
//       navigate("/user/bookings", { state: { refresh: true } });
//     } catch (error) {
//       console.error(error);
//       alert("Gagal membuat booking");
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-xl font-bold mb-4">Booking {service?.name}</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Pilih metode */}
//         <div className="flex space-x-2">
//           <button
//             type="button"
//             className={`flex-1 py-2 rounded-lg ${method === "antar" ? "bg-purple-600 text-white" : "bg-gray-200"
//               }`}
//             onClick={() => setMethod("antar")}
//           >
//             Antar Jemput
//           </button>
//           <button
//             type="button"
//             className={`flex-1 py-2 rounded-lg ${method === "outlet" ? "bg-purple-600 text-white" : "bg-gray-200"
//               }`}
//             onClick={() => setMethod("outlet")}
//           >
//             Datang ke Outlet
//           </button>
//         </div>

//         {/* Input Outlet */}
//         <input
//           type="text"
//           placeholder="Cari Outlet"
//           className="w-full border p-2 rounded-lg"
//           value={outlet}
//           onChange={(e) => setOutlet(e.target.value)}
//         />

//         {/* Input Tanggal */}
//         <input
//           type="date"
//           className="w-full border p-2 rounded-lg"
//           value={date}
//           onChange={(e) => setDate(e.target.value)}
//           required
//         />

//         {/* Input Waktu */}
//         <input
//           type="time"
//           className="w-full border p-2 rounded-lg"
//           value={time}
//           onChange={(e) => setTime(e.target.value)}
//           required
//         />

//         {/* Submit */}
//         <button
//           type="submit"
//           className="w-full py-2 bg-purple-600 text-white rounded-lg"
//         >
//           Lanjut
//         </button>
//       </form>
//     </div>
//   );
// }
