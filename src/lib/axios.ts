// lib/axios.ts
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // your API base URL
});

axiosInstance.interceptors.request.use((config) => {
  // Add auth token here, for example from localStorage or a cookie
  const token = localStorage.getItem("token"); // or get from context
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Optional: handle global errors here
    return Promise.reject(error);
  }
);

export default axiosInstance;
