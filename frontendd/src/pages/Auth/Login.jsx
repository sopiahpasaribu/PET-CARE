import { Link } from 'react-router-dom';
import LoginForm from '../../components/Auth/LoginForm';
import Footer from "../../components/Common/Footer";

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Pet-themed background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Cats */}
        <div className="absolute top-20 left-20 text-4xl opacity-10">🐱</div>
        <div className="absolute top-1/3 right-1/4 text-5xl opacity-15">😺</div>

        {/* Dogs */}
        <div className="absolute top-[20%] right-20 text-4xl opacity-15">🐶</div>
        <div className="absolute bottom-1/3 left-1/4 text-5xl opacity-10">🐕</div>

        {/* Rabbits */}
        <div className="absolute top-1/4 left-1/5 text-4xl opacity-15">🐇</div>
        <div className="absolute top-2/3 right-1/5 text-5xl opacity-10">🐰</div>

        {/* Paw prints */}
        <div className="absolute top-10 right-10 text-3xl opacity-10">🐾</div>
        <div className="absolute bottom-10 left-10 text-3xl opacity-15">🐾</div>
      </div>

      {/* Konten utama */}
      <div className="flex-grow flex items-center justify-center relative z-10 py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
              create a new account
            </Link>
          </p>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white bg-opacity-90 backdrop-blur-sm py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>

      {/* Footer selalu di bawah */}
      <Footer />
    </div>
  );
}
