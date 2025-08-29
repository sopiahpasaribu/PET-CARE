import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../services/auth';
import { Link } from 'react-router-dom';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(formData);
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm flex items-center">
          <span className="mr-2">⚠️</span>
          {error}
        </div>
      )}
      
      <div className="space-y-1">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Full Name <span className="text-pink-500">*</span>
        </label>
        <div className="relative">
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="block w-full px-4 py-3 border border-orange-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
            required
            minLength={3}
            maxLength={50}
            
          />
          <span className="absolute right-3 top-3 text-gray-400">👤</span>
        </div>
      </div>
      
      <div className="space-y-1">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email <span className="text-pink-500">*</span>
        </label>
        <div className="relative">
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="block w-full px-4 py-3 border border-orange-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
            required
            
          />
          <span className="absolute right-3 top-3 text-gray-400">📧</span>
        </div>
      </div>
      
      <div className="space-y-1">
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Phone Number <span className="text-pink-500">*</span>
        </label>
        <div className="relative">
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="block w-full px-4 py-3 border border-orange-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
            required
            
          />
          <span className="absolute right-3 top-3 text-gray-400">📱</span>
        </div>
      </div>
      
      <div className="space-y-1">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password <span className="text-pink-500">*</span>
        </label>
        <div className="relative">
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="block w-full px-4 py-3 border border-orange-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
            required
            minLength={6}
            maxLength={40}
            
          />
          <span className="absolute right-3 top-3 text-gray-400">🔒</span>
        </div>
      </div>
      
      <div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-4 rounded-lg shadow-md font-medium flex items-center justify-center transition-all duration-200 ${
            loading 
              ? 'bg-orange-400 text-white' 
              : 'bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:shadow-lg transform hover:scale-[1.01]'
          }`}
        >
          {loading ? (
            <>
              <span className="mr-2">⏳</span> Registering...
            </>
          ) : (
            <>
              <span className="mr-2">🐱</span> Register
            </>
          )}
        </button>
      </div>
      
      <div className="text-center text-sm text-gray-500 pt-2">
        Already have an account?{' '}
        <Link to="/login" className="text-orange-500 hover:text-pink-500 font-medium">
          Login here
        </Link>
      </div>
    </form>
  );
}