import axios from "axios";

const httpClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const PUBLIC_ENDPOINTS = [
  "/api/login",
  "/api/register",
  "/api/confirm",
  "/api/resend-confirmation",
];

httpClient.interceptors.request.use((config) => {
  const url = config.url || "";
  const isPublic = PUBLIC_ENDPOINTS.some((p) => url.startsWith(p));

  if (!isPublic) {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } else {
    
    if (config.headers?.Authorization) {
      delete config.headers.Authorization;
    }
  }

  return config;
});

export default httpClient;
