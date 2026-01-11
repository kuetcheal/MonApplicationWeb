// src/api/videoApi.js
import httpClient from "./httpClient";

export const videoApi = {
  getAll: (params = {}) => httpClient.get("/api/videos", { params }),

  getOne: (id) => httpClient.get(`/api/videos/${id}`),

  remove: (id) => httpClient.delete(`/api/videos/${id}`),

  // +1 vue
  addView: (id) => httpClient.post(`/api/videos/${id}/view`),

  // like / unlike
  setLike: (id, liked) =>
    httpClient.post(`/api/videos/${id}/like`, { liked }),

  // dislike / undislike
  setDislike: (id, disliked) =>
    httpClient.post(`/api/videos/${id}/dislike`, { disliked }),

  // (GET à garder pour plus tard si tu veux la liste des commentaires)
  getComments: (id) => httpClient.get(`/api/videos/${id}/comments`),

  addComment: (id, content, authorName = null) =>
    httpClient.post(`/api/videos/${id}/comments`, {
      content,
      authorName,
    }),
};
