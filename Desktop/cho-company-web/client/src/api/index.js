import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const fetchNews = async () => {
  const response = await api.get('/news');
  return response.data;
};

export const fetchProducts = async (category = '') => {
  const response = await api.get('/products', {
    params: category ? { category } : {}
  });
  return response.data;
};

export const fetchProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const sendInquiry = async (formData) => {
  const response = await api.post('/inquiries', formData);
  return response.data;
};

export const fetchServerStatus = async () => {
  const response = await api.get('/status');
  return response.data;
};

export default api;
