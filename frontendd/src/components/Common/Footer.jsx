import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-orange-50 to-pink-50 border-t border-orange-200 mt-16">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center mb-4">
              <img 
                src="/LOGO.png" 
                alt="PetCare Logo" 
                className="w-16 h-16 rounded-full mr-3"
              />
              <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                PetCare
              </span>
            </div>
            <p className="text-gray-600 mb-4 max-w-md">
              Memberikan perawatan terbaik untuk hewan peliharaan kesayangan Anda dengan layanan profesional dan penuh kasih sayang.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-orange-500 transition-colors">
                <span className="sr-only">Facebook</span>
                <span className="text-xl">📘</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-orange-500 transition-colors">
                <span className="sr-only">Instagram</span>
                <span className="text-xl">📸</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-orange-500 transition-colors">
                <span className="sr-only">Twitter</span>
                <span className="text-xl">🐦</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-orange-500 transition-colors">
                <span className="sr-only">WhatsApp</span>
                <span className="text-xl">💬</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Tautan Cepat</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/user/services" className="text-gray-600 hover:text-orange-500 transition-colors">
                  Layanan Kami
                </Link>
              </li>
              <li>
                <Link to="/OutletsSection.jsx" className="text-gray-600 hover:text-orange-500 transition-colors">
                  Lokasi Outlet
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-orange-500 transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-orange-500 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Kontak Kami</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-orange-500 mr-2 mt-1">📧</span>
                <span className="text-gray-600">petcare@gmail.com</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2 mt-1">📞</span>
                <span className="text-gray-600">+62 21 1234 5678</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2 mt-1">🕒</span>
                <span className="text-gray-600">Setiap hari 08:00 - 20:00</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-2 mt-1">📍</span>
                <span className="text-gray-600">Bandung, Indonesia</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-orange-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} PetCare. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-500 hover:text-orange-500 text-sm transition-colors">
                Kebijakan Privasi
              </Link>
              <Link to="/terms" className="text-gray-500 hover:text-orange-500 text-sm transition-colors">
                Syarat & Ketentuan
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative paw prints */}
      <div className="relative overflow-hidden">
        <div className="absolute bottom-2 left-10 text-orange-200 text-2xl opacity-50">🐾</div>
        <div className="absolute bottom-6 left-1/4 text-orange-200 text-2xl opacity-50">🐾</div>
        <div className="absolute bottom-3 right-1/4 text-orange-200 text-2xl opacity-50">🐾</div>
        <div className="absolute bottom-8 right-16 text-orange-200 text-2xl opacity-50">🐾</div>
      </div>
    </footer>
  );
}

export default Footer;