import { api } from './index';

export const getUsers = (params) => api.get("/customers", { params });
