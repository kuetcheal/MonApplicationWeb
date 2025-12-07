import httpClient from './httpClient';

export const clientApi = {
  getAll: () => httpClient.get('/api/clients'),
  create: (data) => httpClient.post('/api/clients', data),
  // etc.
};