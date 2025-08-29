import { useState, useEffect } from "react";
import StarRating from "./StarRating";

export default function Testimials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  const testimonials = [
    { 
      id: 1, 
      name: "Chatarina Hen...", 
      text: "Tempat yang terbaik untuk memeriksakan kesehatan binatang kesayangan kita. Dokter dan pegawainya sangat profesional dan ramah.", 
      rating: 5,
      date: "2024-05-25",
      source: "Google",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=128&h=128&q=80"
    },
    { 
      id: 2, 
      name: "Warih ARP", 
      text: "Pet shop & klinik dengan banyak promo: vaksin, steril, promo beli pakan kucing & anjing. Tempat nyaman dan pelayanan memuaskan.", 
      rating: 4.5,
      date: "2024-05-23",
      source: "Google",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=128&h=128&q=80"
    },
    { 
      id: 3, 
      name: "Retno Ayuwulandari", 
      text: "Tempat nya bagus, kucing ku juga setelah di grooming jadi lebih bersih dan wangi. Free pemeriksaan dokter lagi. Sangat recommended!", 
      rating: 5,
      date: "2024-05-20",
      source: "Google",
      avatar: "https://images.unsplash.com/photo-1516726817505-f5ed825624d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=128&h=128&q=80"
    },
    { 
      id: 4, 
      name: "Budi Santoso", 
      text: "Dokter hewannya sangat ahli dan sabar. Kucing saya tidak stres selama perawatan. Hasilnya juga memuaskan.", 
      rating: 5,
      date: "2024-05-18",
      source: "Google",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=128&h=128&q=80"
    },
    { 
      id: 5, 
      name: "Diana Putri", 
      text: "Harga terjangkau dengan kualitas premium. Anjing saya jadi wangi dan bersih! Pelayanan sangat cepat dan profesional.", 
      rating: 4,
      date: "2024-05-15",
      source: "Google",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=128&h=128&q=80"
    }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    if (isHovered) return; // Jangan rotate jika user hover
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isHovered, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex(prev => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="relative py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">OUR TESTIMONIAL</h2>
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center mb-2">
              <StarRating rating={4.9} size="lg" />
              <span className="ml-2 text-2xl font-bold text-gray-900">4.9</span>
            </div>
            <p className="text-gray-600">Berdasarkan 908 ulasan</p>
            <div className="mt-2 flex items-center">
              <svg className="w-6 h-6 text-blue-500 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 16l-5-5 1.41-1.41L11 14.17l7.59-7.59L20 8l-9 9z"/>
              </svg>
              <span className="text-gray-700 font-medium">Google</span>
            </div>
          </div>
        </div>

        {/* Main testimonial section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Title and stats */}
          <div className="lg:col-span-1">
            <h3 className="text-1xl font-bold text-gray-900 mb-4">BAGUS SEKALI</h3>
            <p className="text-gray-600 mb-6">Berdasarkan 908 ulasan</p>
            
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <div className="flex items-center">
                <svg className="w-8 h-8 text-blue-600 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 16l-5-5 1.41-1.41L11 14.17l7.59-7.59L20 8l-9 9z"/>
                </svg>
                <span className="text-lg font-semibold text-gray-900">Google</span>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="text-lg font-bold text-gray-900 mb-4">DOKTER HEWAN DI PETCARE</h4>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold mr-3">DR</div>
                  <div>
                    <p className="font-semibold text-gray-900">Dr. Rina Wijaya</p>
                    <p className="text-sm text-gray-600">Spesialis Bedah</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-3">DS</div>
                  <div>
                    <p className="font-semibold text-gray-900">Dr. Surya Adi</p>
                    <p className="text-sm text-gray-600">Spesialis Dermatologi</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold mr-3">DA</div>
                  <div>
                    <p className="font-semibold text-gray-900">Dr. Anita Putri</p>
                    <p className="text-sm text-gray-600">Spesialis Anestesi</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Testimonials */}
          <div className="lg:col-span-2">
            <div 
              className="relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Navigation Arrows */}
              <button 
                onClick={prevTestimonial}
                className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-all duration-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              
              <button 
                onClick={nextTestimonial}
                className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-all duration-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>

              {/* Main testimonial card */}
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
                <div className="flex items-start mb-4">
                  <img 
                    src={testimonials[currentIndex].avatar} 
                    alt={testimonials[currentIndex].name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonials[currentIndex].name}</h4>
                    <div className="flex items-center text-sm text-gray-500">
                      <span>{testimonials[currentIndex].date}</span>
                    </div>
                  </div>
                </div>
                
                <StarRating rating={testimonials[currentIndex].rating} size="md" />
                
                <p className="mt-4 text-gray-700">
                  {testimonials[currentIndex].text}
                </p>
                
                <button className="mt-4 text-orange-500 hover:text-orange-600 font-medium flex items-center">
                  Baca lebih lanjut
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>

              {/* Testimonial indicators */}
              <div className="flex justify-center mt-6 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex ? 'bg-orange-500 w-8' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Additional testimonials grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {testimonials.slice(1, 3).map((testimonial) => (
                <div 
                  key={testimonial.id} 
                  className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start mb-3">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full object-cover mr-3"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">{testimonial.name}</h4>
                      <div className="flex items-center text-xs text-gray-500">
                        <span>{testimonial.date}</span>
                      </div>
                    </div>
                  </div>
                  
                  <StarRating rating={testimonial.rating} size="sm" />
                  
                  <p className="mt-3 text-gray-700 text-sm">
                    {testimonial.text.slice(0, 100)}...
                  </p>
                  
                  <button className="mt-3 text-orange-500 hover:text-orange-600 text-sm font-medium flex items-center">
                    Baca lebih lanjut
                    <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}