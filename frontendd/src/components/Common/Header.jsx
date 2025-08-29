// src/components/Common/Header.jsx
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../../services/auth";
import { useState, useEffect, useRef } from "react";

export default function Header() {
  const user = getCurrentUser();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Tutup dropdown saat klik di luar
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-gradient-to-r from-orange-50 to-pink-50 shadow-md relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo + Nama */}
          <Link
            to={user?.role === "ADMIN" ? "/admin/dashboard" : "/user/dashboard"}
            className="flex items-center space-x-2"
          >
            <img
              src="/LOGO.png"
              alt="PetCare Logo"
              className="w-20 h-20 rounded-full"
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              PetCare
            </span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-6">
            {user ? (
              user.role === "ADMIN" ? (
                <>
                  {/* === ADMIN MENU === */}
                  <Link
                    to="/admin/dashboard"
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-orange-500 flex items-center"
                  >
                    <span className="mr-1">📊</span> Dashboard
                  </Link>
                  <Link
                    to="/admin/services"
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-orange-500 flex items-center"
                  >
                    <span className="mr-1">🛠</span> Layanan Saya
                  </Link>
                  <Link
                    to="/admin/bookings"
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-orange-500 flex items-center"
                  >
                    <span className="mr-1">📅</span> Semua Booking
                  </Link>

                  {/* Dropdown Admin */}
                  <div className="relative" ref={dropdownRef}>
                    <button
                      type="button"
                      onClick={() => setOpen(!open)}
                      className="flex items-center space-x-2 text-sm font-medium text-gray-700 focus:outline-none"
                    >
                      <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full flex items-center justify-center text-white">
                        {user.name ? user.name.charAt(0).toUpperCase() : "A"}
                      </div>
                      <span>{user.name || "Admin"}</span>
                      <span className="text-gray-500">▼</span>
                    </button>

                    <div
                      className={`absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 transform transition-all duration-200 z-50
                        ${open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
                    >
                      <Link
                        to="/admin/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500 flex items-center"
                        onClick={() => setOpen(false)}
                      >
                        <span className="mr-2">👤</span> Profil Admin
                      </Link>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500 flex items-center"
                      >
                        <span className="mr-2">🚪</span> Logout
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* === USER MENU === */}
                  <Link
                    to="/user/dashboard"
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors flex items-center"
                  >
                    <span className="mr-1">🏠</span> Home
                  </Link>
                  <Link
                    to="/user/services"
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors flex items-center"
                  >
                    <span className="mr-1">🐾</span> Layanan
                  </Link>
                  <Link
                    to="/user/pets"
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors flex items-center"
                  >
                    <span className="mr-1">🐕</span> Hewan Saya
                  </Link>
                  <Link
                    to="/user/bookings"
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors flex items-center"
                  >
                    <span className="mr-1">📅</span> Booking Saya
                  </Link>

                  {/* Dropdown User */}
                  <div className="relative" ref={dropdownRef}>
                    <button
                      type="button"
                      onClick={() => setOpen(!open)}
                      className="flex items-center space-x-2 text-sm font-medium text-gray-700 focus:outline-none"
                    >
                      <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full flex items-center justify-center text-white">
                        {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                      </div>
                      <span>{user.name || "User"}</span>
                      <span className="text-gray-500">▼</span>
                    </button>

                    <div
                      className={`absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 transform transition-all duration-200 z-50
                        ${open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
                    >
                      <Link
                        to="/user/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500 flex items-center"
                        onClick={() => setOpen(false)}
                      >
                        <span className="mr-2">👤</span> Profil Saya
                      </Link>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500 flex items-center"
                      >
                        <span className="mr-2">🚪</span> Logout
                      </button>
                    </div>
                  </div>
                </>
              )
            ) : (
              <>
                {/* Guest */}
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors flex items-center"
                >
                  <span className="mr-1">🔑</span> Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-gradient-to-r from-orange-400 to-pink-400 text-white text-sm font-medium rounded-full shadow hover:shadow-md transition-all flex items-center"
                >
                  <span className="mr-1">✨</span> Register
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>

      {/* Decorative cat ears */}
      <div className="absolute top-0 left-1/4 w-6 h-6 bg-orange-200 rounded-tl-full rounded-tr-full"></div>
      <div className="absolute top-0 right-1/4 w-6 h-6 bg-orange-200 rounded-tl-full rounded-tr-full"></div>
    </header>
  );
}
