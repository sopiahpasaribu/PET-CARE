import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from './components/Common/Header';
import PrivateRoute from './components/Common/PrivateRoute';
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import UserDashboard from './pages/User/Dashboard';
import UserPets from './pages/User/Pets';
import UserBookings from './pages/User/Bookings';
import UserServices from './pages/User/Services';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminServices from './pages/Admin/AdminServices';
import AdminBookings from './pages/Admin/AdminBookings';
import UserProfile from './pages/User/UserProfile';
import AdminProfile from './pages/Admin/AdminProfile';
import { getCurrentUser } from './services/auth';

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header user={user} />
        
        <main className="py-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* User routes */}
            <Route path="/user/dashboard" element={
              <PrivateRoute role="USER">
                <UserDashboard />
              </PrivateRoute>
            } />
            <Route path="/user/pets" element={
              <PrivateRoute role="USER">
                <UserPets />
              </PrivateRoute>
            } />
            <Route path="/user/bookings" element={
              <PrivateRoute role="USER">
                <UserBookings />
              </PrivateRoute>
            } />
            <Route path="/user/services" element={
              <PrivateRoute role="USER">
                <UserServices />
              </PrivateRoute>
            } />
            <Route path="/user/profile" element={
              <PrivateRoute role="USER">
                <UserProfile />
              </PrivateRoute>
            } />
            
            {/* Admin routes */}
            <Route path="/admin/dashboard" element={
              <PrivateRoute role="ADMIN">
                <AdminDashboard />
              </PrivateRoute>
            } />
            <Route path="/admin/services" element={
              <PrivateRoute role="ADMIN">
                <AdminServices />
              </PrivateRoute>
            } />
            <Route path="/admin/bookings" element={
              <PrivateRoute role="ADMIN">
                <AdminBookings />
              </PrivateRoute>
            } />
            <Route path="/admin/profile" element={
              <PrivateRoute role="ADMIN">
                <AdminProfile />
              </PrivateRoute>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
