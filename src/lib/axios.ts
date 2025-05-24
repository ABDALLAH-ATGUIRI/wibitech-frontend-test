// lib/axios.ts
import axios from "axios";

const instanceAxios = axios.create({
  baseURL: "/api",
  withCredentials: true, // for cookies (e.g., Sanctum or Passport)
});

// Optional: Request Interceptor (add auth headers if needed)
instanceAxios.interceptors.request.use(
  (config) => {
    // Example: add Authorization token from localStorage
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Response Interceptor (global error handling)
instanceAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    // Global error handling
    if (status === 401) {
      console.warn("Unauthorized, redirecting to login...");
    } else if (status === 500) {
      console.error("Server error");
    }

    return Promise.reject(error);
  }
);

export default instanceAxios;
