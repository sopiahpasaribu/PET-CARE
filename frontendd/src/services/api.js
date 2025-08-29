// services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// === AUTH TOKEN INTERCEPTOR ===
api.interceptors.request.use(
  (config) => {
    config = config || {};
    config.headers = config.headers || {};

    const token = localStorage.getItem('token');
    console.log('Token from localStorage:', token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Authorization header set (interceptor):', config.headers.Authorization);
    } else {
      console.warn('No token found in localStorage (interceptor)');
    }
    return config;
  },
  (err) => Promise.reject(err)
);

// === ERROR HANDLER ===
api.interceptors.response.use(
  (response) => {
    console.log('Response received:', response);
    return response;
  },
  (error) => {
    console.error('API Error:', error);

    if (error && error.response) {
      console.error('Error response:', error.response);

      const status = error.response.status;
      if (status === 401) {
        console.log('Unauthorized, redirecting to login');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      } else if (status === 403) {
        console.warn('Forbidden access - check user permissions');
      }
    }
    return Promise.reject(error);
  }
);

// ====================
// PET ENDPOINTS
// ====================
export const getMyPets = () => api.get('/user/pets').then(res => res.data);
export const addPet = (petData) => api.post('/user/pets', petData).then(res => res.data);
export const updatePet = (id, petData) => api.put(`/pets/${id}`, petData).then(res => res.data);
export const deletePet = (id) => api.delete(`/pets/${id}`).then(res => res.data);
export const getPetDetail = (id) => api.get(`/pets/${id}`).then(res => res.data);

// ====================
// BOOKING ENDPOINTS
// ====================

// Get semua booking (khusus admin)
export const getAllBookings = () => api.get('/bookings').then(res => res.data);

// Get booking by ID
export const getBookingById = (id) => api.get(`/bookings/${id}`).then(res => res.data);

// 🔍 Search bookings (by user, pet, or service name)
export const searchBookings = (keyword) =>
  api.get(`/bookings/search?keyword=${keyword}`).then(res => res.data);

// 📅 Sort bookings (by bookingTime asc/desc)
export const sortBookings = (order = "asc") =>
  api.get(`/bookings/sort?order=${order}`).then(res => res.data);

// Create booking for logged-in user
// Backend expects: POST /api/user/bookings?petId=...&serviceId=...
export const createBooking = (bookingData) => {
  console.log('createBooking raw:', bookingData);

  if (!bookingData || (!bookingData.petId && bookingData.petId !== 0) || (!bookingData.serviceId && bookingData.serviceId !== 0)) {
    console.warn('createBooking: missing petId or serviceId', bookingData);
  }

  const params = {
    petId: bookingData?.petId,
    serviceId: bookingData?.serviceId,
  };

  const body = {
    bookingDate: bookingData?.bookingDate,
    bookingTime: bookingData?.bookingTime,
  };

  console.log('createBooking will send params:', params, 'body:', body);

  return api.post('/user/bookings', body, { params }).then(res => res.data);
};

// Update booking status (admin)
export const updateBookingStatus = (id, status) =>
  api.put(`/bookings/${id}/status?status=${status}`).then(res => res.data);

// Delete booking
export const deleteBooking = (id) => api.delete(`/bookings/${id}`).then(res => res.data);

// Get bookings milik user login
export const getUserBookings = () => api.get('/user/bookings').then(res => res.data);

// Alias agar kompatibel dengan import lama
export const getMyBookings = getUserBookings;

// ====================
// SERVICE ENDPOINTS
// ====================

// Semua layanan (umum / user)
export const getAllServices = () =>
  api.get('/services').then(res => res.data);

// Semua layanan milik admin login
export const getMyServices = () =>
  api.get('/admin/services').then(res => res.data);

// Tambah layanan oleh admin login
export const createService = (serviceData) =>
  api.post('/admin/services', serviceData).then(res => res.data);

// Update layanan milik admin login
export const updateService = (id, serviceData) =>
  api.put(`/admin/services/${id}`, serviceData).then(res => res.data);

// Hapus layanan milik admin login
export const deleteService = (id) =>
  api.delete(`/admin/services/${id}`).then(res => res.data);

// ====================
// PET POINTS, OUTLETS, SERVICES BY TYPE
// ====================
export const getMyPetPoints = () => api.get('/petpoints/my-points').then(res => res.data);
export const usePetPoints = (points) => api.post(`/petpoints/use-points?points=${points}`).then(res => res.data);

export const getOutlets = (search) =>
  api.get('/bookings/outlets', { params: { search } }).then(res => res.data);

export const getServices = (type) =>
  api.get('/bookings/services', { params: { type } }).then(res => res.data);

// ====================
// USER PROFILE
// ====================
export const updateUserProfile = (userData) =>
  api.put('/user/profile', userData).then(res => res.data);

export const deleteUserAccount = () =>
  api.delete('/user').then(res => res.data);

export default api;
