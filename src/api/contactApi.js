import httpClient from "./httpClient";

export const contactApi = {
  // PUBLIC: formulaire contact
  send: (payload) => httpClient.post("/api/contact", payload),

  // PUBLIC: candidature casting (si tu l'utilises côté front)
  applyCasting: (payload) => httpClient.post("/api/castings/apply", payload),

  // ADMIN: listes
  getAllMessages: () => httpClient.get("/api/contact/messages?type=contact"),
  getAllCastings: () => httpClient.get("/api/contact/messages?type=casting"),

  // ADMIN: suppression
  removeMessage: (id) => httpClient.delete(`/api/contact/messages/${id}`),
  removeCasting: (id) => httpClient.delete(`/api/contact/messages/${id}`),
};
