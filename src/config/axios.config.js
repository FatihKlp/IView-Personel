import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Her istekte 'Content-Type: application/json' başlığını otomatik ekle
instance.interceptors.request.use((config) => {
  // JSON isteklerinde 'Content-Type: application/json' başlığını ekleyin
  if (!config.headers["Content-Type"] && !(config.data instanceof FormData)) {
    config.headers["Content-Type"] = "application/json";
  }
  return config;
});

// Yanıt interceptor'ı ekleyerek hata döndürme
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;