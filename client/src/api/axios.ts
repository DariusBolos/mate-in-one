import axios from "axios";

const userUrl = `${import.meta.env.VITE_API_URL}/user`;

const API = axios.create({
  baseURL: userUrl,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;
