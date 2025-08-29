export default function WelcomeSection({ petPoints }) {
  return (
    <div className="bg-gradient-to-r from-orange-500 to-pink-600 rounded-2xl shadow-xl p-6 text-white mb-8 relative overflow-hidden animate-fade-in">
      {/* Dekorasi background */}
      <div className="absolute -right-4 -top-4 w-28 h-28 bg-white opacity-10 rounded-full animate-pulse"></div>
      <div className="absolute -right-8 -bottom-8 w-36 h-36 bg-white opacity-5 rounded-full animate-ping"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-4 left-10 animate-float text-4xl">🐾</div>
        <div className="absolute bottom-4 right-16 animate-float-delayed text-3xl">🐶</div>
        <div className="absolute top-12 right-20 animate-float text-2xl">🐱</div>
      </div>
      
      {/* Konten utama */}
      <div className="flex flex-col md:flex-row justify-between items-center relative z-10">
        {/* Teks kiri */}
        <div className="mb-4 md:mb-0 max-w-lg">
          <h2 className="text-2xl font-bold mb-2 animate-fade-in-up">
            Selamat Datang di PetCare! 🐾
          </h2>
          <p className="text-orange-100 animate-fade-in-up delay-100">
            Memberikan perawatan terbaik untuk hewan peliharaan kesayangan Anda dengan 
            layanan profesional, peralatan steril, dan staf yang berpengalaman.
          </p>
        </div>

        {/* Gambar kanan */}
        <div className="w-40 md:w-56 lg:w-64">
          <img 
            src="/PET.png" 
            alt="PetCare" 
            className="rounded-xl shadow-lg animate-fade-in-up"
          />
        </div>
      </div>
    </div>
  );
}
