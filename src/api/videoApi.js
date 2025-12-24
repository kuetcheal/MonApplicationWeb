// src/api/videoApi.js
import httpClient from "./httpClient";

export const videoApi = {
  getAll: () => httpClient.get("/api/videos"),          
  getOne: (id) => httpClient.get(`/api/videos/${id}`),  
  remove: (id) => httpClient.delete(`/api/videos/${id}`), 
};
