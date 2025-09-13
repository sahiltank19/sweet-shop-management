import axios from 'axios';
import auth from './auth';

const API_URL = 'http://localhost:3000/api/students';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000
});

api.interceptors.request.use(config => {
  const headers = auth.getAuthHeader();
  if (headers.Authorization) config.headers.Authorization = headers.Authorization;
  return config;
});

const register = async (data) => {
  const res = await api.post('/register', data);
  return res.data;
};

const fetchProfile = async () => {
  const res = await api.get('/profile');
  return res.data;
};

const updateProfile = async (formData) => {
  const res = await api.post('/update-profile', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return res.data;
};

export default { register, fetchProfile, updateProfile };

