// src/components/UserDashboard/WhyChoose.jsx
import { useState, useEffect, useRef } from "react";

export default function WhyChoose() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // biar animasi hanya sekali muncul
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`max-w-6xl mx-auto px-6 py-16 text-center transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Kenapa Memilih <span className="text-orange-500">PetCare?</span>
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto mb-12">
        Kami hadir untuk memberikan layanan terbaik untuk hewan kesayanganmu,
        dengan tenaga profesional, fasilitas modern, dan perhatian penuh.
      </p>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
          <span className="text-5xl">🐾</span>
          <h3 className="font-semibold text-xl mt-4">Perawatan Profesional</h3>
          <p className="text-gray-600 mt-2">
            Tim berpengalaman yang siap merawat hewanmu dengan sepenuh hati.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
          <span className="text-5xl">🏥</span>
          <h3 className="font-semibold text-xl mt-4">Fasilitas Lengkap</h3>
          <p className="text-gray-600 mt-2">
            Klinik modern dengan peralatan lengkap untuk semua kebutuhan hewan.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
          <span className="text-5xl">❤️</span>
          <h3 className="font-semibold text-xl mt-4">Kasih Sayang Penuh</h3>
          <p className="text-gray-600 mt-2">
            Kami memperlakukan hewan peliharaanmu seperti keluarga sendiri.
          </p>
        </div>
      </div>
    </section>
  );
}
