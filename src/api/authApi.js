import httpClient from './httpClient';

export const authApi = {
  login: (email, password) =>
    httpClient.post('/api/login', { email, password }),

  register: (email, password) =>
    httpClient.post('/api/register', { email, password }),

  me: () => httpClient.get('/api/me'),
};