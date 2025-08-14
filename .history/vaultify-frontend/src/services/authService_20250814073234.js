// services/authService.js
import axios from "axios";

// Base API configuration
const BASE_URL = "http://localhost:8000/api";
const api = axios.create({ baseURL: BASE_URL });

// Automatically attach token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("vaultify_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Login function
export const login = async ({ email, password }) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    if (response.data.token) {
      localStorage.setItem("vaultify_token", response.data.token);
    }
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Login failed" };
  }
};

// Register function
export const register = async ({ name, email, password }) => {
  try {
    const response = await api.post("/auth/register", { name, email, password });
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Registration failed" };
  }
};

export const logout = () => {
  localStorage.removeItem("vaultify_token");
};