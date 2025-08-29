import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllServices, getMyPets, createBooking } from "../../services/api";
import { motion, AnimatePresence } from "framer-motion"; 
import Footer from "../../components/Common/Footer";


const serviceTypeMapping = {
  GROOMING: { 
    name: "Grooming", 
    icon: "✂️", 
    color: "bg-pink-100", 
    hoverColor: "bg-pink-200", 
    barColor: "bg-pink-400",
    image: "/GROOMING.jpg"
  },
  VAKSINASI: { 
    name: "Vaksinasi", 
    icon: "💉", 
    color: "bg-red-100", 
    hoverColor: "bg-red-200", 
    barColor: "bg-red-400",
    image: "/VAKSIN.jpg"
  },
  STERILISASI: { 
    name: "Sterilisasi", 
    icon: "🔪", 
    color: "bg-indigo-100", 
    hoverColor: "bg-indigo-200", 
    barColor: "bg-indigo-400",
    image: "/STERILISASI.jpg"
  },
  PEMERIKSAAN: { 
    name: "Pemeriksaan Laboratorium", 
    icon: "🏠", 
    color: "bg-green-100", 
    hoverColor: "bg-green-200", 
    barColor: "bg-green-400",
    image: "/PEMERIKSAAN.jpg"
  }
};

export default function Services() {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [pets, setPets] = useState([]);
  const [bookingData, setBookingData] = useState({
    petId: "",
    bookingDate: "",
    bookingTime: ""
  });
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const init = async () => {
      setIsLoading(true);
      let localError = null;
      try {
        const s = await getAllServices();
        if (!controller.signal.aborted) {
          setServices(s || []);
        }
      } catch (err) {
        console.error("fetchServices err:", err);
        localError = err?.response?.data?.message || err.message || "Gagal memuat layanan";
      }
      try {
        const p = await getMyPets();
        if (!controller.signal.aborted) {
          setPets(p || []);
        }
      } catch (err) {
        console.error("fetchPets err:", err);
        if (!localError) localError = "Gagal memuat data hewan peliharaan";
      }
      if (!controller.signal.aborted) {
        setError(localError);
        setIsLoading(false);
      }
    };
    init();
    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.body.style.overflow = showBookingModal ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [showBookingModal]);

  const handleSelectService = (service) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError("Silakan login terlebih dahulu untuk melakukan booking");
      navigate('/login');
      return;
    }
    setSelectedService(service);
    setShowBookingModal(true);
    setBookingError(null);
    setBookingData({
      petId: "",
      bookingDate: "",
      bookingTime: ""
    });
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setBookingError(null);
    if (!bookingData.petId || !bookingData.bookingDate || !bookingData.bookingTime) {
      setBookingError("Semua field harus diisi.");
      return;
    }
    if (!selectedService) {
      setBookingError("Layanan tidak dipilih.");
      return;
    }
    try {
      setBookingLoading(true);
      const bookingTimeISO = `${bookingData.bookingDate}T${bookingData.bookingTime}:00`;
      const bookingRequest = {
        petId: parseInt(bookingData.petId, 10),
        serviceId: selectedService.id,
        bookingDate: bookingData.bookingDate,
        bookingTime: bookingTimeISO
      };
      console.log("Attempt createBooking with:", bookingRequest, "token:", localStorage.getItem('token'));
      const res = await createBooking(bookingRequest);
      console.log("createBooking response:", res);
      alert("Booking berhasil dibuat!");
      setShowBookingModal(false);
      setSelectedService(null);
      setBookingData({ petId: "", bookingDate: "", bookingTime: "" });
      // kirim state refresh ke Bookings
      navigate("/bookings", { state: { refresh: true } });
    } catch (err) {
      console.error("Error booking:", err);
      let errorMessage = "Gagal membuat booking";
      if (err?.response?.status === 403) {
        errorMessage = "Akses ditolak. Pastikan Anda memiliki izin yang sesuai.";
      } else if (err?.response?.status === 401) {
        errorMessage = "Sesi telah berakhir. Silakan login kembali.";
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
      } else if (err?.response?.data) {
        const d = err.response.data;
        errorMessage = d?.message || d?.error || JSON.stringify(d);
      } else if (err?.message) {
        errorMessage = err.message;
      }
      setBookingError(errorMessage);
    } finally {
      setBookingLoading(false);
    }
  };

  const getServiceCardInfo = (service) => {
    return serviceTypeMapping[service.type] || {
      name: service.name,
      icon: "📦",
      color: "bg-gray-100",
      hoverColor: "bg-gray-200",
      barColor: "bg-gray-400",
      image: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    };
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-xl text-gray-600 font-medium">Memuat layanan...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-blue-50">
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Pilih Layanan</h1>
            <p className="text-gray-600">Pilih layanan untuk memulai proses booking</p>
          </div>
        </div>
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
            <div className="flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p className="font-medium">{error}</p>
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {services.map((service) => {
            const cardInfo = getServiceCardInfo(service);
            return (
              <motion.div
                key={service.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg cursor-pointer 
                  transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl 
                  border border-gray-100 group flex flex-col"
                onMouseEnter={() => setHoveredCard(service.id)}
                onMouseLeave={() => setHoveredCard(null)}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                {/* Bagian Gambar */}
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={cardInfo.image} 
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center shadow-md">
                    <span className="text-2xl">{cardInfo.icon}</span>
                  </div>
                  <div className="absolute bottom-3 left-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="font-bold text-lg">{service.name}</p>
                  </div>
                </div>
                {/* Bagian Konten */}
                <div className="p-5 relative flex-grow">
                  <p className="font-bold text-gray-800 text-xl mb-2">{service.name}</p>
                  <p className="text-gray-600 mb-4 line-clamp-2">{service.description || "Layanan profesional untuk hewan peliharaan Anda"}</p>
                  
                  <div className="flex justify-between items-center mt-4 mb-4">
                    <p className="text-orange-600 font-bold text-lg">Rp {service.basePrice?.toLocaleString('id-ID') || '0'}</p>
                    <div className="flex items-center bg-blue-50 px-3 py-1 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-xs text-blue-700 font-medium">{service.estimatedDuration} menit</span>
                    </div>
                  </div>
                </div>
                {/* Button Booking */}
                <div className="p-4 pt-0">
                  <motion.button
                    onClick={() => handleSelectService(service)}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-4 rounded-lg 
                             transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                    </svg>
                    Booking Sekarang
                  </motion.button>
                </div>
                {/* Hover effect bar */}
                <div
                  className={`h-1 ${cardInfo.barColor} transform origin-left 
                    transition-transform duration-300 ${hoveredCard === service.id ? "scale-x-100" : "scale-x-0"}`}
                ></div>
              </motion.div>
            );
          })}
        </div>
        {services.length === 0 && !isLoading && (
          <div className="text-center py-10">
            <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-gray-500 text-lg">Tidak ada layanan yang tersedia.</p>
          </div>
        )}
        {/* Modal Booking */}
        <AnimatePresence>
          {showBookingModal && selectedService && (
            <motion.div 
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div 
                className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25 }}
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">Booking Layanan</h2>
                    <motion.button
                      onClick={() => { setShowBookingModal(false); setSelectedService(null); }}
                      className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label="Close booking modal"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </motion.button>
                  </div>
                  <div className="mb-6 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border border-orange-100">
                    <div className="flex items-start">
                      <div className="mr-4 mt-1">
                        <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                          <span className="text-2xl">{serviceTypeMapping[selectedService.type]?.icon || "📦"}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-gray-800">{selectedService.name}</p>
                        <p className="text-gray-600 mt-1">{selectedService.description}</p>
                        <div className="flex items-center mt-2">
                          <p className="text-gray-700">
                            <span className="font-medium">Harga:</span> 
                            <span className="font-bold text-orange-600 ml-1">Rp {selectedService.basePrice?.toLocaleString('id-ID')}</span>
                          </p>
                          <span className="mx-2 text-gray-300">•</span>
                          <p className="text-gray-600">
                            <span className="font-medium">Durasi:</span> 
                            <span className="ml-1">{selectedService.estimatedDuration} menit</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {bookingError && (
                    <motion.div 
                      className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <p className="font-medium">{bookingError}</p>
                      </div>
                    </motion.div>
                  )}
                  <form onSubmit={handleBookingSubmit} className="space-y-5">
                    <div>
                      <label className="block mb-2 font-medium text-gray-700">Pilih Hewan</label>
                      <div className="relative">
                        <select
                          value={bookingData.petId}
                          onChange={(e) => setBookingData({ ...bookingData, petId: e.target.value })}
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white"
                          required
                        >
                          <option value="">-- Pilih Hewan --</option>
                          {pets.map((pet) => (
                            <option key={pet.id} value={pet.id}>
                              {pet.name} ({pet.species})
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block mb-2 font-medium text-gray-700">Tanggal Booking</label>
                      <div className="relative">
                        <input
                          type="date"
                          value={bookingData.bookingDate}
                          onChange={(e) => setBookingData({ ...bookingData, bookingDate: e.target.value })}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          required
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block mb-2 font-medium text-gray-700">Waktu Booking</label>
                      <div className="relative">
                        <input
                          type="time"
                          value={bookingData.bookingTime}
                          onChange={(e) => setBookingData({ ...bookingData, bookingTime: e.target.value })}
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          required
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3 pt-4">
                      <motion.button
                        type="button"
                        onClick={() => { setShowBookingModal(false); setSelectedService(null); }}
                        className="flex-1 bg-gray-100 text-gray-800 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                        disabled={bookingLoading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Batal
                      </motion.button>
                      <motion.button
                        type="submit"
                        disabled={bookingLoading}
                        className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 font-medium flex items-center justify-center gap-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {bookingLoading ? (
                          <>
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Memproses...
                          </>
                        ) : (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Konfirmasi Booking
                          </>
                        )}
                      </motion.button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
      </div>
              <Footer />
    </div>
  );
}