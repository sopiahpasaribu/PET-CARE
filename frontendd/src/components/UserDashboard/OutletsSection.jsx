// src/components/UserDashboard/OutletsSection.jsx
import { useEffect, useMemo } from "react";
import StarRating from "./StarRating";

export default function OutletsSection({ outlets, selectedOutlet, setSelectedOutlet }) {
  // 1 cabang Bandung (statis)
  const bandungOutlet = useMemo(
    () => ({
      id: "petcare-bandung-dago",
      name: "PetCare Bandung — Dago",
      address: "Jl. Ir. H. Djuanda (Dago), Bandung",
      latitude: -6.914744, // area pusat Bandung
      longitude: 107.60981,
      rating: 4.8,
      highlight: true,
    }),
    []
  );

  // Gabungkan outlet asli + 1 Bandung (hanya menambah satu)
  const outletsWithBandung = useMemo(() => {
    const exists = outlets?.some(o => String(o.id) === String(bandungOutlet.id));
    return exists ? outlets : [...(outlets || []), bandungOutlet];
  }, [outlets, bandungOutlet]);

  // Default pilih Bandung jika belum ada pilihan
  useEffect(() => {
    if (!selectedOutlet && setSelectedOutlet) {
      setSelectedOutlet(bandungOutlet);
    }
  }, [selectedOutlet, setSelectedOutlet, bandungOutlet]);

  return (
    <div className="relative rounded-3xl border border-white/20 bg-gradient-to-br from-orange-50/80 via-white/80 to-amber-50/80 backdrop-blur-sm shadow-xl p-6 md:p-8 mb-10 animate-fade-in-up delay-700 overflow-hidden">
      {/* Glow dekorasi */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-orange-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-amber-200/40 blur-3xl" />

      <div className="relative">
        <h2 className="text-2xl md:text-3xl font-extrabold text-center text-gray-800 tracking-tight">
          Cabang PetCare
        </h2>
        <p className="text-center text-sm md:text-base text-gray-600 mt-1">
          Pilih cabang yang kamu mau, kami pilihkan Bandung sebagai default ✨
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {outletsWithBandung.map((outlet) => (
            <div
              key={outlet.id}
              onClick={() => setSelectedOutlet?.(outlet)}
              className={[
                "group relative p-5 rounded-2xl cursor-pointer transition-all duration-300",
                "bg-white border hover:shadow-xl hover:-translate-y-0.5",
                selectedOutlet?.id === outlet.id
                  ? "border-orange-500 ring-2 ring-orange-200/60"
                  : "border-gray-200"
              ].join(" ")}
            >
              {/* Badge highlight untuk Bandung */}
              {outlet.highlight && (
                <span className="absolute -top-3 left-4 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-3 py-1 text-xs font-semibold text-white shadow-md">
                  ✨ Rekomendasi Bandung
                </span>
              )}

              <div className="flex items-start justify-between">
                <h3 className="font-bold text-gray-800 text-lg">{outlet.name}</h3>
                <span className="text-[11px] md:text-xs px-2 py-1 rounded-full bg-orange-50 text-orange-700 border border-orange-200">
                  {selectedOutlet?.id === outlet.id ? "Dipilih" : "Pilih"}
                </span>
              </div>

              <p className="text-sm text-gray-600 mt-1">{outlet.address}</p>

              <div className="mt-3 flex items-center justify-between">
                <StarRating rating={outlet.rating || 4.5} />
                <span className="text-xs text-gray-500">
                  Koordinat: {Number(outlet.latitude).toFixed(4)}, {Number(outlet.longitude).toFixed(4)}
                </span>
              </div>

              {/* Hover underline accent */}
              <div className="absolute inset-x-4 -bottom-1 h-1 rounded-full bg-gradient-to-r from-orange-200 via-amber-200 to-orange-200 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          ))}
        </div>

        {selectedOutlet && (
          <div className="mt-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 grid place-content-center text-white shadow-md">
                📍
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold text-gray-800">
                  Lokasi: {selectedOutlet.name}
                </h3>
                <p className="text-sm text-gray-600">{selectedOutlet.address}</p>
              </div>
            </div>

            <div className="relative rounded-2xl border border-orange-200/60 bg-white overflow-hidden shadow-lg">
              {/* Border gradient tipis di atas */}
              <div className="h-1 w-full bg-gradient-to-r from-orange-400 via-amber-400 to-orange-400" />
              <div className="w-full aspect-video md:h-80">
                <iframe
                  title="map"
                  src={`https://www.google.com/maps?q=${selectedOutlet.latitude},${selectedOutlet.longitude}&hl=id;z=14&output=embed`}
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
