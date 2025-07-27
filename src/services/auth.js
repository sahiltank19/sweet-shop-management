// frontend/src/services/auth.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add response interceptor for error handling
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      // Handle specific status codes
      if (error.response.status === 401) {
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error.message);
  }
);

const register = async (userData) => {
  try {
    const response = await api.post('/register', userData);
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify({
        token: response.data.token,
        user: response.data.user
      }));
    }
    return response.data;
  } catch (error) {
    console.error('Registration error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.error || 'Registration failed');
  }
};

const login = async (credentials) => {
  try {
    const response = await api.post('/login', credentials);
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify({
        token: response.data.token,
        user: response.data.user
      }));
    }
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

const logout = () => {
  localStorage.removeItem('user');
  // Optional: Call backend logout endpoint if you have one
  // await api.post('/logout');
};

const getCurrentUser = () => {
  try {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
};

const getAuthHeader = () => {
  const user = getCurrentUser();
  return user && user.token 
    ? { Authorization: `Bearer ${user.token}` }
    : {};
};

const isAdmin = () => {
  const user = getCurrentUser();
  return user && user.user && user.user.role === 'admin';
};

// Add token to all requests if available
api.interceptors.request.use(config => {
  const authHeader = getAuthHeader();
  if (authHeader.Authorization) {
    config.headers.Authorization = authHeader.Authorization;
  }
  return config;
});

export default {
  api,
  register,
  login,
  logout,
  getCurrentUser,
  isAdmin,
  getAuthHeader
};