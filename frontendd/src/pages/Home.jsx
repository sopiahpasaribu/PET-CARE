import { Link } from 'react-router-dom';
import { getCurrentUser } from '../services/auth';

export default function Home() {
  const user = getCurrentUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col overflow-hidden">
      {/* Scattered Cat Paw Decorations - More spaced out */}
      {[...Array(12)].map((_, i) => {
        const positions = [
          'top-10 left-1/12',
          'top-1/4 right-20',
          'bottom-1/3 left-16',
          'top-1/5 right-1/4',
          'bottom-1/4 right-1/3',
          'top-2/3 left-1/5',
          'bottom-10 right-1/6',
          'top-1/2 left-1/3',
          'bottom-1/2 right-10',
          'top-3/4 left-1/4',
          'bottom-3/4 right-1/5',
          'top-10 right-10'
        ];
        const sizes = ['w-10 h-10', 'w-8 h-8', 'w-12 h-12', 'w-9 h-9'];
        const opacities = ['opacity-10', 'opacity-15', 'opacity-20'];
        const rotations = ['rotate-0', 'rotate-12', 'rotate-45', '-rotate-12'];

        return (
          <div
            key={i}
            className={`absolute ${positions[i]} ${sizes[i % sizes.length]} ${opacities[i % opacities.length]} ${rotations[i % rotations.length]} animate-float`}
            style={{ animationDelay: `${i * 0.5}s` }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className={i % 2 ? 'text-purple-300' : 'text-orange-200'}>
              <path d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm-1 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm3 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-6 6c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2z" />
            </svg>
          </div>
        );
      })}

      <main className="flex-grow flex items-center justify-center px-4 z-10">
        <div className="text-center max-w-4xl">
          {/* Replace this div with your actual logo image */}
          <div className="mb-8 flex justify-center">
            {/* This is a placeholder - replace the img src with your actual logo URL */}
            <img
              src="LOGO.png"
              alt="PetCare Logo"
              className="h-32 w-auto object-contain"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iI0ZCMDg0QyIgZD0iTTEyIDJDNy44NiAyIDQuNSA1LjM2IDQuNSA5LjVjMCA1LjUgNyAxMyA3LjUgMTNzNy41LTcuNSA3LjUtMTNDMTkuNSA1LjM2IDE2LjE0IDIgMTIgMnptLTEgNGMuNTUgMCAxIC40NSAxIDFzLS40NSAxLTEgMS0xLS40NS0xLTFzLjQ1LTEgMS0xem0zIDBjLjU1IDAgMSAuNDUgMSAxcy0uNDUgMS0xIDEtMS0uNDUtMS0xcy40NS0xIDEtMXptLTYgNmMwLTEuMS45LTIgMi0yczIgLjkgMiAyLS45IDItMiAyLTItLjktMi0yem0xMS41IDMuNWMwIC4yOC0uMjIuNS0uNS41aC0xYy0uMjggMC0uNS0uMjItLjUtLjVzLjIyLS41LjUtLjVoMWMuMjggMCAuNS4yMi41LjV6Ii8+PC9zdmc+'
              }}
            />
          </div>

          <h1 className="text-4xl font-bold text-gray-800 sm:text-3xl lg:text-4xl mb-6">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">PetCare</span>
          </h1>

          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Professional grooming and pampering for your precious pets
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {user ? (
              <Link
                to={user.role === 'ADMIN' ? '/admin/dashboard' : '/user/dashboard'}
                className="px-8 py-4 bg-gradient-to-r from-orange-400 to-pink-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>Go to Dashboard</span>
                <span>🐾</span>
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="px-8 py-4 bg-gradient-to-r from-orange-400 to-pink-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>Get started</span>
                  <span>✨</span>
                </Link>
                <Link
                  to="/login"
                  className="px-8 py-4 bg-white text-orange-500 border-2 border-orange-400 font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>Login</span>
                  <span>🔑</span>
                </Link>
              </>
            )}
          </div>

          {/* Services Section */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Grooming', icon: '✂️', desc: 'Bathing, trimming, and styling' },
              { name: 'Spa', icon: '🛁', desc: 'Relaxing treatments' },
              { name: 'Health', icon: '❤️', desc: 'Wellness checks' },
              { name: 'Styling', icon: '💇', desc: 'Creative cuts' }
            ].map((service) => (
              <div key={service.name} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                  {service.icon}
                </div>
                <h3 className="font-bold text-gray-800 text-lg mb-2">{service.name}</h3>
                <p className="text-gray-600 text-sm">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-500 relative z-10">
        <p className="relative z-10">© {new Date().getFullYear()} PetCare Grooming Studio</p>
        <div className="mt-2 flex justify-center space-x-4">
          <span className="text-sm">🐾 Certified Groomers</span>
          <span className="text-sm">🌟 Premium Products</span>
          <span className="text-sm">❤️ Loving Care</span>
        </div>
      </footer>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(var(--rotate-start)); }
          50% { transform: translateY(-15px) rotate(var(--rotate-end)); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
          --rotate-start: 0deg;
          --rotate-end: 5deg;
        }
      `}</style>
    </div>
  );
}