// src/components/UserDashboard/ServicesOverview.jsx
import { Link } from "react-router-dom";

// Mapping service type → icon, warna, gambar, dll
const serviceTypeMapping = {
  GROOMING: { 
    name: "Grooming", 
    icon: "✂️", 
    color: "bg-pink-50", 
    hoverColor: "hover:bg-pink-100", 
    barColor: "bg-pink-400",
    image: "/GROOMING.jpg",
    description: "Perawatan menyeluruh untuk hewan peliharaan."
  },
  VAKSINASI: { 
    name: "Vaksinasi", 
    icon: "💉", 
    color: "bg-red-50", 
    hoverColor: "hover:bg-red-100", 
    barColor: "bg-red-400",
    image: "/VAKSIN.jpg",
    description: "Melindungi hewan dari penyakit berbahaya."
  },
  STERILISASI: { 
    name: "Sterilisasi", 
    icon: "🔪", 
    color: "bg-indigo-50", 
    hoverColor: "hover:bg-indigo-100", 
    barColor: "bg-indigo-400",
    image: "/STERILISASI.jpg",
    description: "Prosedur medis untuk kesehatan jangka panjang."
  },
  PEMERIKSAAN: { 
    name: "Pemeriksaan Laboratorium", 
    icon: "🏠", 
    color: "bg-green-50", 
    hoverColor: "hover:bg-green-100", 
    barColor: "bg-green-400",
    image: "/PEMERIKSAAN.jpg",
    description: "Tes kesehatan lengkap untuk hewan peliharaan."
  }
};

export default function ServicesOverview() {
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-10 mb-12 border border-white/30 animate-fade-in-up delay-300">
      <h2 className="text-2xl font-extrabold text-center mb-10 text-gray-800 tracking-wide">
        Layanan Kami ✨
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {Object.entries(serviceTypeMapping).map(([key, service]) => (
          <div
            key={key}
            className={`p-6 rounded-2xl shadow-md border transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl ${service.color} ${service.hoverColor}`}
          >
            {/* Icon di atas */}
            <div className="flex items-center justify-center mb-4">
              <span className="text-5xl">{service.icon}</span>
            </div>

            {/* Gambar layanan (sedikit diperkecil) */}
            <div className="overflow-hidden rounded-xl mb-4">
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-48 object-cover rounded-xl transition-transform duration-500 hover:scale-110"
              />
            </div>

            {/* Nama layanan */}
            <h4 className="text-lg font-semibold text-gray-900 text-center mb-2">
              {service.name}
            </h4>

            {/* Deskripsi */}
            <p className="text-sm text-gray-600 text-center leading-relaxed">
              {service.description}
            </p>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link
          to="/user/services"
          className="inline-block bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:opacity-90 transition duration-300"
        >
          🚀 Booking Layanan
        </Link>
      </div>
    </div>
  );
}
