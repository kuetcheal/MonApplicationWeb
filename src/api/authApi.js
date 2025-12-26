import httpClient from "./httpClient";

export const authApi = {
  login: (email, password) => httpClient.post("/api/login", { email, password }),
  register: (data) => httpClient.post("/api/register", data),

  confirmEmail: (email, code) => httpClient.post("/api/confirm", { email, code }),
  resendConfirmation: (email) => httpClient.post("/api/resend-confirmation", { email }),

  forgotPassword: (email) => httpClient.post("/api/forgot-password", { email }),
  resetPassword: (token, password) =>
    httpClient.post("/api/reset-password", { token, password }),

  me: () => httpClient.get("/api/me"),
  updateMe: (payload) => httpClient.put("/api/me", payload),
  deleteMe: () => httpClient.delete("/api/me"),
};
