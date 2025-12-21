import httpClient from "./httpClient";

export const authApi = {
login: (email, password) => httpClient.post("/api/login", { username: email, password }),

  // Symfony attend: nom, email, password
  register: (data) => httpClient.post("/api/register", data),

  //  NEW: confirmer l'email avec code
  confirmEmail: (email, code) =>
    httpClient.post("/api/confirm", { email, code }),

  //  NEW: renvoyer un code
  resendConfirmation: (email) =>
    httpClient.post("/api/resend-confirmation", { email }),

  me: () => httpClient.get("/api/me"),
};
