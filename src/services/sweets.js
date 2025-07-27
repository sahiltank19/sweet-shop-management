// frontend/src/services/sweets.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/sweets';

const getToken = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user ? user.token : null;
};

const getAuthHeader = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const getAllSweets = async () => {
  const response = await axios.get(API_URL, { headers: getAuthHeader() });
  return response.data;
};

const searchSweets = async (params) => {
  const response = await axios.get(`${API_URL}/search`, { 
    params,
    headers: getAuthHeader()
  });
  return response.data;
};

const createSweet = async (sweetData) => {
  const response = await axios.post(API_URL, sweetData, { headers: getAuthHeader() });
  return response.data;
};

const updateSweet = async (id, sweetData) => {
  const response = await axios.put(`${API_URL}/${id}`, sweetData, { headers: getAuthHeader() });
  return response.data;
};

const deleteSweet = async (id) => {
  await axios.delete(`${API_URL}/${id}`, { headers: getAuthHeader() });
};

const purchaseSweet = async (id) => {
  const response = await axios.post(`${API_URL}/${id}/purchase`, {}, { headers: getAuthHeader() });
  return response.data;
};

const restockSweet = async (id, quantity) => {
  const response = await axios.post(`${API_URL}/${id}/restock`, { quantity }, { headers: getAuthHeader() });
  return response.data;
};

export default {
  getAllSweets,
  searchSweets,
  createSweet,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet
};