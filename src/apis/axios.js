import axios from "axios";

const api = axios.create({
  // baseURL: process.env.REACT_APP_HOST_URL,
  baseURL: "https://one4th-mydiary.onrender.com",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const email = localStorage.getItem("userEmail");
  if (email) config.headers["x-user-email"] = email;
  return config;
});

export default api;
