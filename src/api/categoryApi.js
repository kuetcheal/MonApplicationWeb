import httpClient from "./httpClient";

export const categoryApi = {
  getAll: () => httpClient.get("/api/categories"),
  create: (payload) => httpClient.post("/api/categories", payload),
  update: (id, payload) => httpClient.patch(`/api/categories/${id}`, payload),
  remove: (id) => httpClient.delete(`/api/categories/${id}`),
};
