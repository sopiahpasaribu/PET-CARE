// src/services/auth.js
import api from './api';

export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });

  // simpan token
  localStorage.setItem('token', response.data.accessToken);

  // simpan user (pastikan backend kirim name & phone)
  if (response.data.name && response.data.phone) {
    localStorage.setItem(
      'user',
      JSON.stringify({
        name: response.data.name,
        email: response.data.email,
        phone: response.data.phone,
        role: response.data.role,
      })
    );
  }

  return response.data;
};

export const register = async (userData) => {
  await api.post('/auth/register', userData);
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user'); // hapus juga data user
  window.location.href = '/login';
};

export const getCurrentUser = () => {
  // cek apakah ada object user tersimpan
  const userStr = localStorage.getItem('user');
  if (userStr) {
    return JSON.parse(userStr);
  }

  // fallback decode token
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(window.atob(base64));

    return {
      email: payload.sub,
      role: payload.role,
    };
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};
